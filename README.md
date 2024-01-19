# Webimpetus Desktop App

Webimpetus desktop app is focusing on the creating the timesheets from you desktop application based on the task you worked on.

## System Requirements (ELECTRON DESKTOP APP)

#### Linux

- Python version 2.7.x. It is recommended to check your Python version since some distributions like CentOS 6.x still use Python 2.6.x.

#### Mac
- Python version 2.7.x with support for TLS 1.2.
- Xcode, the IDE for macOS, comes bundled with necessary software development tools to code signing and compiling native code for macOS. Version 8.2.1 or higher.
- ##### RedHat Build Support
  - Homebrew, one of the available macOS package managers, is used for installing additional tools and dependencies. Homebrew is needed to install RPM packaging dependencies. Brew Install Step.
  - RPM, a standard package manager for multiple Linux distributions, is the tool used for creating the Linux RPM package. To install this tool, use the following Homebrew command:
    ```
     brew install rpm
    ```
#### Windows
- Python version 2.7.10 or higher.
- PowerShell, for Windows 7 users, must be at version 3.0 or greater for app signing.
- Debugging Tools for Windows is a toolkit for enhancing debug capabilities. It is recommended to install with the Windows SDK 10.0.15063.468.


## System Requirements (ANDROID APP)
- Webimpetus android app relies on the Android SDK, which can be installed on macOS, Linux, or Windows operating systems.
- To ensure your system meets the necessary requirements, please refer to the "Install Android Studio" guide provided by Google.

### The Required Software & Tools
- #### Java Development Kit (JDK)
  - Install the Java Development Kit (JDK) 11.
  - The JAVA_HOME environment variable must be set according to your JDK installation path.
- #### Gradle
  Gradle is required to be installed.
- #### Android Studio
  Opening Android Studio for the first time will guide you through the process of installing the Android SDK packages.
  - ##### SDK Packages
    It is recommended to install the latest version of the SDK Platform & SDK Tools.

## System Requirements (IOS APP)
- #### Xcode
  Once Xcode is installed, several command-line tools need to be enabled for Webimpetus IOS app to run. From the command line, run:
  ```
   xcode-select --install
  ```
- #### Deployment Tools
  The ios-deploy tools allow you to launch iOS apps on an iOS Device from the command-line.

  Install ios-deploy via Homebrew by running:
  ```
   brew install ios-deploy
  ```
- #### CocoaPods
  The CocoaPods tools are needed to build iOS apps. A minimum version of 1.8.0 is required but the latest release is always recommended.

  To install CocoaPods, run the following from command-line terminal:
  ```
   sudo gem install cocoapods
  ```

## Installation

NOTE: Node 18.18.0 is required before installing the webimpetus desktop on local machine.

Use the package manager npm to install Webimpetus desktop.

```bash
npm run install-dependencies
```

## Usage (ELECTRON)

```
npm run electron
```

To run on android or ios please use Adnroid Studio or Xcode.