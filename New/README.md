# JavaFX Starter Project Using Maven

- [JavaFX Starter Project Using Maven](#javafx-starter-project-using-maven)
	- [Run/Debug Configurations](#rundebug-configurations)

This is a simple template for creating `JavaFx` project with `IntelliJ IDEA` using `Maven`  build automation tool.

## Run/Debug Configurations

**1. Create New Maven App:**

![img1](../../img/maven-1.jpg)

![img2](../../img/maven-2.jpg)

**2. Set Maven Goals:**

Under `Parameters`, set below maven commands in `Command Line` text-field

```bash
compiler:compile javafx:run
# or
compiler:compile javafx:run -f pom.xml
```

![img3](../../img/maven-3.jpg)

Now, you can run the project
