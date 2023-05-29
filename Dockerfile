FROM nginx

RUN nginx -v

RUN mkdir -p /home/app

# Copy the Nginx config
COPY . etc/nginx

# Run the Nginx server
CMD ["/usr/sbin/nginx","-g", "daemon off;"]