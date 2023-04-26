---
title: cpu调速风扇
categories: 工具
tags:
  - 工具
  - 风扇
comments: false
abbrlink: 39128
date: 2022-10-10 21:08:48
img: 'https://cdn.jsdelivr.ren/gh/879733672/images@cdn/img/202304262110565.png'
---
### 常用3线4线cpu风扇机箱风扇接口定义

4根线分别是GND、VCC、FG转速信号、PWM（调速）。 位置可能不同。 FG是转速信号，用于CPU侦测转速。转速=频率*30（4极风扇）。 PWM通过方波占空比控制转速。PWM接地–最低转速，PWM不接最高转速。频率25KHZ。一般Duty 0%-20%转速是相同的。可以用函数信号发生器提供信号测试Duty–转速曲线。 MCU可以控制PWM控制转速。可以通过FG做闭环控制。 注意接口都是开集电极输出，需要上拉电阻。


![](https://cdn.jsdelivr.ren/gh/879733672/images@cdn/img/202210102114239.png)

- CPU 风扇 3针定义：1脚 接地（一般为黑色线）2脚 12V电压（红色线）3脚 测速线FG（监控风扇转速，一般黄色）。

- CPU 风扇 4针定义：1脚 接地（一般为黑色线）2脚 12V电压（红色线）3脚 测速线FG（监控风扇转速，一般黄色）。3脚 调速线PWM（PWM调速，一般蓝色）如下图：

![](https://cdn.jsdelivr.ren/gh/879733672/images@cdn/img/202210102130842.png)

4针插座比3针多出一根第4针（用于转速调节控制）。

3针的插座，3针风扇的引脚中间是+12V电源，中间左边黑色的线（一般都是黑线）是地，最右边的是测速。

![](https://cdn.jsdelivr.ren/gh/879733672/images@cdn/img/202210102131124.png)