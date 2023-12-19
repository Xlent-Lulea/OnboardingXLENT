FROM nginx:1.25.2
COPY ./dist/onboarding-xlent ./usr/share/nginx/html
