FROM nginx

RUN nginx -v

RUN mkdir -p /home/app

# Copy the Nginx config
COPY . /home/app

# Expose the port for access
EXPOSE 80/tcp

# Run the Nginx server
CMD ["/usr/sbin/nginx","-g", "daemon off;"]
#CMD ["/usr/sbin/nginx", "-g", "daemon off;"]