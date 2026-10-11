# 微醺印记 · 产品官网

智能酒杯产品「微醺印记」的品牌官网与交互体验站：电影感滚动叙事、3D 产品展示、玻璃拟态界面与印记生成演示。

- 线上：https://tipsy-imprint.pages.dev
- 配套商家数据后台（[tipsy-imprint-merchant](https://github.com/DylanYeung0929/tipsy-imprint-merchant)）：https://tipsy-merchant.pages.dev

## 页面

| 路由 | 页面 | 内容 |
|---|---|---|
| `#/` | HomePage | 品牌叙事主站：液体玻璃视觉、产品机制滚动演示（拆解杯垫）、酒款图鉴 |
| `#/drink/:id` | DetailPage | 酒款详情与视觉 |
| `#/generating` | GeneratingPage | 印记生成过渡动效 |
| `#/imprint/:id` | ImprintPage | 印记结果页（花纹卡片，可保存图片） |
| `#/session/:id` | SessionPage | 单次品饮会话回放 |
| `#/dashboard` | DashboardPage | 体验数据驾驶舱（配合传感器演示） |

导航 EXPLORE 下拉含「商家注册」入口，外链至商家数据后台。

## 技术栈

- Vite + React + TypeScript，hash 路由 + 页面懒加载
- GSAP + Lenis：电影感滚动叙事与平滑滚动
- Three.js：iPhone 产品 3D 展示（运行时模型 `public/models/iphone-17-pro.glb`，设计源文件不入库）
- Vanta：液体背景；Tailwind + tailwind-merge
- html-to-image：印记卡片导出

## 目录结构

```
├── src/
│   ├── pages/        # Home / Detail / Generating / Imprint / Session / Dashboard
│   ├── components/   # 视觉与交互组件（3D 手机、玻璃按钮、滚动演示等）
│   ├── hooks/        # useSensorDemo / useSmoothScroll
│   ├── assets/       # 品牌与演示视觉素材（generated/ 为设计生成图）
│   └── styles.css
├── public/models/    # 运行时 3D 模型
├── design-system/    # 设计规范
└── wrangler.jsonc    # Cloudflare Pages 静态资源部署配置
```

## 本地开发与部署

```bash
npm install
npm run dev        # 本地 dev server
npm run deploy     # 构建 + wrangler deploy（Cloudflare Pages）
```

两站（官网 + 商家端）联动重部署可统一走商家端仓库的 `node deploy-public.mjs`。
