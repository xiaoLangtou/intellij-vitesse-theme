import org.jetbrains.changelog.Changelog
import org.jetbrains.changelog.markdownToHTML

fun properties(key: String) = providers.gradleProperty(key)
fun environment(key: String) = providers.environmentVariable(key)

plugins {
    id("java")
    id("org.jetbrains.intellij.platform") version "2.19.0"
    id("org.jetbrains.changelog") version "2.5.0"
}

group = properties("pluginGroup").get()
version = properties("pluginVersion").get()

repositories {
    mavenCentral()
    intellijPlatform {
        defaultRepositories()
    }
}

dependencies {
    intellijPlatform {
        create(properties("platformType"), properties("platformVersion"))
        pluginVerifier()
        zipSigner()
    }
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(25))
    }
}

changelog {
    groups.empty()
    repositoryUrl.set(properties("pluginRepositoryUrl"))
}

intellijPlatform {
    projectName.set(properties("pluginName"))
    buildSearchableOptions.set(false)
    sandboxContainer.set(layout.projectDirectory.dir(".sandbox"))

    pluginConfiguration {
        version.set(properties("pluginVersion"))

        description.set(providers.fileContents(layout.projectDirectory.file("README.md")).asText.map {
            val start = "<!-- Plugin description -->"
            val end = "<!-- Plugin description end -->"

            with(it.lines()) {
                if (!containsAll(listOf(start, end))) {
                    throw GradleException("Plugin description section not found in README.md:\n$start ... $end")
                }
                subList(indexOf(start) + 1, indexOf(end)).joinToString("\n").let(::markdownToHTML)
            }
        })

        val changelog = project.changelog
        changeNotes.set(properties("pluginVersion").map { pluginVersion ->
            with(changelog) {
                renderItem(
                    (getOrNull(pluginVersion) ?: getUnreleased())
                        .withHeader(false)
                        .withEmptySections(false),
                    Changelog.OutputType.HTML,
                )
            }
        })

        ideaVersion {
            sinceBuild.set(properties("pluginSinceBuild"))
            properties("pluginUntilBuild").orNull
                ?.takeIf(String::isNotBlank)
                ?.let(untilBuild::set)
        }
    }

    signing {
        certificateChain.set(environment("CERTIFICATE_CHAIN"))
        privateKey.set(environment("PRIVATE_KEY"))
        password.set(environment("PRIVATE_KEY_PASSWORD"))
    }

    publishing {
        token.set(environment("PUBLISH_TOKEN"))
        channels.set(properties("pluginVersion").map {
            listOf(it.split('-').getOrElse(1) { "default" }.split('.').first())
        })
    }

    pluginVerification {
        ides {
            current()
        }
    }
}

tasks {
    runIde {
        systemProperty("idea.is.internal", "false")
    }

    wrapper {
        gradleVersion = properties("gradleWrapperVersion").get()
    }
}

tasks.register<Exec>("pnpmInstall") {
    group = "build"
    description = "Install theme generator dependencies"
    workingDir = project.rootDir
    commandLine("pnpm", "install", "--frozen-lockfile")

    val packageJson = project.file("package.json")
    val nodeModules = project.file("node_modules")
    onlyIf {
        packageJson.exists() && !nodeModules.exists()
    }
}

val pnpmBuild = tasks.register<Exec>("pnpmBuild") {
    group = "build"
    description = "Generate IntelliJ UI themes and editor schemes"
    workingDir = project.rootDir
    commandLine("pnpm", "run", "build")
    dependsOn("pnpmInstall")
}

tasks.named("processResources") {
    dependsOn(pnpmBuild)
}

tasks.named("buildPlugin") {
    dependsOn(pnpmBuild)
}
