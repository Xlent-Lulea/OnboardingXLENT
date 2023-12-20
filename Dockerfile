FROM nginx:1.25.2
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist/onboarding-xlent ./usr/share/nginx/html