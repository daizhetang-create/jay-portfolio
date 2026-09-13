# 唐代喆 Jay · 个人作品集 / 简历单页网站

> 一个把个人经历、作品、证书和产品演示放在一起的双语个人主页。

在线访问：[daizhetang-create.github.io/jay-portfolio](https://daizhetang-create.github.io/jay-portfolio/)

## 实际演示

1. 打开在线作品集，先浏览首页简介和项目卡片。
2. 向下滚动查看经历、比赛/项目证据和证书。
3. 打开证书灯箱查看大图。
4. 在产品演示卡片中播放 `magic-net-agent-demo.mp4`。
5. 点击“导出 PDF”，生成适合投递或保存的打印版简历。

当前仓库已经包含真实的冠军合照、OG 分享图、证书目录、产品演示视频和视频封面；README 中旧的“占位图待替换”提示已经过时，后续应以仓库实际资源为准。

## 项目定位

- 双语个人作品集与简历入口。
- 适合作为 GitHub 主页、申请材料和项目展示页。
- 纯 HTML / CSS / JS，无构建步骤、无外部 CDN、无浏览器存储。

---
# 唐代喆 Jay · 个人作品集 / 简历单页网站

奶白底（`#F6F4EE`）+ 深墨绿（`#1F4D3A`）+ 暗金（`#9C7B3A`）配色，衬线排版（中文思源宋体 / 西文 Cambria），中英双语、响应式、单页滚动。
纯 **HTML / CSS / JS**，没有任何构建步骤、没有任何外部 CDN、**不使用任何浏览器存储**（localStorage 等都没用）。

---

## 一、文件结构

```
jay-portfolio/
├─ index.html                 ← 网页本体（所有文案在这里，逐字使用你给的原文）
├─ assets/
│  ├─ css/styles.css          ← 全部样式（含手机端 + 打印 PDF 样式）
│  ├─ js/main.js              ← 交互（淡入动画、证书灯箱、导出 PDF）
│  ├─ img/
│  │  ├─ hackathon-champion.jpg   ← 树成林冠军合照【占位图，待你替换】
│  │  ├─ og-cover.jpg             ← 分享到微信/社交平台的预览图
│  │  └─ certs/                   ← 13 张证书（每张有大图 + -thumb 小图两份）
│  └─ video/
│     ├─ magic-net-agent-demo.mp4 ← 你那段产品演示视频（已压到 0.45MB）
│     └─ magic-net-agent-poster.jpg
└─ README.md                  ← 就是本文件
```

---

## 二、本地预览（3 选 1，最简单）

### 方法 A：直接双击（最省事）
直接双击 `index.html` 用浏览器打开即可。
> 注意：这样打开时，那段产品演示视频可能不自动播放（浏览器对本地文件有限制）。文字、图片、证书都正常。想看视频自动播放，用方法 B/C 起一个本地服务器。

### 方法 B：用 Python 起本地服务器（你电脑已装 Python）
在本文件夹里打开 PowerShell，运行：
```powershell
python -m http.server 5500
```
然后浏览器打开 **http://localhost:5500** 。

### 方法 C：用 Node 的 http-server
```powershell
npx -y http-server . -p 5500 -c-1
```
同样打开 **http://localhost:5500** 。

---

## 三、把"树成林冠军合照"换成真图（重要）

现在 `assets/img/hackathon-champion.jpg` 是一张**占位图**（上面写着"请替换为冠军合照"）。
换成真图只要一步：

> 把你的冠军合照，**重命名为 `hackathon-champion.jpg`**，覆盖掉 `assets/img/` 里那张同名占位图即可。
> 文件名别改、放的位置别改，刷新网页就换好了。建议用横版照片、宽度 ≥ 1600 像素。

（那段 AI 出图产品的演示视频是真的，已经放进卡片里，会在滚动到时自动静音播放。）

---

## 四、导出一份整洁的 PDF 简历（用来传表单）

网页右上角有 **「导出 PDF」** 按钮，点它（或按 `Ctrl + P`）。
在弹出的打印窗口里建议这样设置，导出最干净：

- 目标：**另存为 PDF**
- 版式：纵向
- 边距：默认
- **把「页眉和页脚」的勾去掉**（这样就没有网址、日期那一行）
- 「背景图形」开关无所谓（简历本身是白底黑字）

导出的 PDF 会自动变成：白底黑字、单列、去掉导航和动画、去掉视频——一份正经简历。
> 小提示：**导出前先把上面第三步的冠军合照换成真图**，否则 PDF 里也会是那张占位图。

---

## 五、部署上线（2 选 1）

### 选项 1：Vercel（拖拽即可，最适合你）
1. 打开 https://vercel.com ，用 GitHub 或邮箱注册/登录。
2. 进 Dashboard → **Add New… → Project**。
3. 如果不想连 GitHub，可以用最简单的方式：安装一次 CLI 后在本文件夹运行
   ```powershell
   npm i -g vercel
   vercel        # 第一次会让你登录，一路回车用默认即可
   vercel --prod # 正式发布，结束后给你一个网址
   ```
   或者：直接把整个 `jay-portfolio` 文件夹拖到 Vercel 网页的部署区也行。
4. 完成后会得到一个类似 `https://jay-xxxx.vercel.app` 的网址，直接能用。

> 你之前给 PetTI 用过 **Cloudflare Pages**，也完全一样：在 Cloudflare Pages 里选 "Upload assets / 直接上传"，把这个文件夹拖进去就上线了。

### 选项 2：GitHub Pages（免费、网址固定）
1. 在 GitHub 新建一个仓库，比如叫 `jay-portfolio`（Public）。
2. 在本文件夹里运行：
   ```powershell
   git init
   git add .
   git commit -m "唐代喆个人作品集"
   git branch -M main
   git remote add origin https://github.com/daydream-engine/jay-portfolio.git
   git push -u origin main
   ```
   （把上面网址里的 `daydream-engine` 换成你自己的 GitHub 用户名/仓库。）
3. 进仓库 **Settings → Pages → Build and deployment → Source 选 "Deploy from a branch"**，
   Branch 选 `main` / `/(root)`，保存。
4. 等 1～2 分钟，页面会显示一个 `https://用户名.github.io/jay-portfolio/` 的网址。

> 因为是纯静态网站、所有资源都用相对路径，Vercel 和 GitHub Pages 都不需要任何额外配置，传上去就能跑。

---

## 六、想自己改文案 / 换图？

- **改文字**：全部中文正文都在 `index.html` 里，直接搜你要改的那句话改就行。
- **换证书**：把 `assets/img/certs/` 里对应的 `xxx.jpg`（大图）和 `xxx-thumb.jpg`（小图）替换成新图、保持同名即可。
- **换配色**：打开 `assets/css/styles.css`，最上面的 `:root` 里改这几个变量即可，整站统一跟着变：`--paper`（奶白底）、`--green`/`--green-deep`（墨绿主强调）、`--gold`（暗金点缀）。
