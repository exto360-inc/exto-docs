# ---------- Build stage ----------
FROM node:20-alpine AS build

WORKDIR /app

# The capture pipeline is a devDependency, and installing `playwright` pulls
# ~300 MB of browsers we have no use for inside an image that only builds HTML.
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

# `lastUpdated: true` derives each page's date by shelling out to git log, so
# the build stage needs both the binary and the repository history. That is
# also why .git is deliberately NOT in .dockerignore, and why CI checks out
# with fetch-depth: 0.
RUN apk add --no-cache git

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build


# ---------- Runtime stage ----------
# Same patched base as exto-web, so the docs image inherits the same CVE fixes
# rather than quietly becoming the oldest nginx in the cluster.
FROM cw26/nginx:1.29.5-alpine3.23-patched

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.vitepress/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
