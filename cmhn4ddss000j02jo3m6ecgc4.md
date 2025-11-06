---
title: "新的博客部署成功啦"
datePublished: Thu Nov 06 2025 07:42:54 GMT+0000 (Coordinated Universal Time)
cuid: cmhn4ddss000j02jo3m6ecgc4
slug: 5paw55qe5y2a5a6i6yoo572y5oiq5yqf5zwm
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/cPF2nlWcMY4/upload/731a1a6e8bf6c020da29039fd464e202.jpeg
tags: 5oqy6iw

---

> 昨天心血来潮，基于这个博客里的教程，部署了hashnode的博客，这是作者写的（[教程](https://blog.duizhang.fun/blog))

部署成功以后，我测试了一下，确实牛逼啊。hashnode相当于一个CMS，可以远程管理博客。就像现在我就在hashnode里面写文章，甚至不需要图床，就用这个平台提供的，简直不要太优雅。

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762412997459/98bdea32-1537-4ef2-a038-15c780e5c174.png align="center")

顺便，部署在vercel以后，我配置了自定义域名在cloudflare里，写了第一篇文章，发了图片。做了简单的页面设置以后，打开手机。完美的感觉被打破了….

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762413259440/6ffbc951-bcac-426e-b848-ee59fe0e529e.png align="center")

what?居然没有适配移动端，可以明显看到导航栏被挤在了一起，然后社交媒体图标似乎也没有适配完全。

随后我果断，我上网进行了搜索，竟然发现了作者的linuxdo发的帖子哈哈。

[https://linux.do/t/topic/278426](https://linux.do/t/topic/278426)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762413637855/e21a3de6-a143-42ec-8cd1-ea22cba87751.png align="center")

作者似乎忙于考试没有再对项目进行更新了…

然后我又搜了一下，发现hashnode自己做博客主题的确实比较少，基本都使用官方现成的，那就试试看cursor能不能解决移动端适配的问题吧。

接着我把项目git clone到了本地，装好了开发环境，开始了今天的折腾。

```bash
# Clone this repository
git clone https://github.com/femincan/personal-blog.git

# Go into the repository
cd personal-blog

# Install dependencies
pnpm install
```

然后运行本地项目

```bash
pnpm run dev
```

中间报了错，原来是忘记配置本地环境了，把错误发给cursor，一套解决了，随后也是非常顺利，经过了好多次的修改。移动端适配也做出来了，顺便优化了搜索按钮，原本按下搜索以后，页面直接跳转到/search了，而我让cursor帮我改成依然在原页面浮窗搜索。

再对UI进行了🤏一点点改进...

主要实现了以下内容：

* 实现双列文章布局，提升信息密度
    
* 优化无图片文章卡片，添加完整占位区域
    
* 集成 Unsplash API，为无图片文章自动添加随机占位图
    
* 优化导航栏，添加半透明毛玻璃效果
    
* 简化 footer 样式，使用分隔线替代阴影卡片
    
* 添加中文字体支持（霞鹜文楷），支持字体回退
    
* 优化 About 卡片，添加区块分隔线
    
* 修复移动端适配问题
    

---