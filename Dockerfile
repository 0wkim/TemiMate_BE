# 1) Node 이미지 사용
FROM node:20-alpine

# 2) 작업 디렉토리
WORKDIR /usr/src/app

# 3) 패키지 먼저 복사 후 설치 (캐시 활용)
COPY package*.json ./
RUN npm install --production

# 4) 나머지 소스 복사
COPY . .

# 5) 컨테이너 내부에서 열 포트 (env의 PORT와 맞춰줌)
EXPOSE 5000

# 6) 서버 실행 (엔트리포인트)
CMD ["node", "src/app.js"]