const getTextColor = (hexColor: string) => {
  // 将十六进制颜色转换为RGB值
  const red = parseInt(hexColor.slice(1, 3), 16)
  const green = parseInt(hexColor.slice(3, 5), 16)
  const blue = parseInt(hexColor.slice(5, 7), 16)

  // 计算相对亮度
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000

  // 根据相对亮度判断文字颜色
  if (brightness >= 128) {
    return 'black'
  } else {
    return 'white'
  }
}

export default getTextColor
