## icon

- android add [https://github.com/oblador/react-native-vector-icons]
  Edit android/app/build.gradle
  `apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"`

project.ext.vectoricons = [
iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
