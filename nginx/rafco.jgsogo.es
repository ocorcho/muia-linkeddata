server {
    listen 80;
    server_name rafco.jgsogo.es;
    access_log /home/javi/projects/muia_linkeddata/logs/nginx_access.log;
    error_log /home/javi/projects/muia_linkeddata/logs/nginx_error.log;

    # Make sure files with the following extensions do not get loaded by nginx because nginx would display the source code, and these files can contain PASSWORDS!
    location ~* \.(engine|inc|info|install|make|module|profile|test|po|sh|.*sql|theme|tpl(\.php)?|xtmpl)$|^(\..*|Entries.*|Repository|Root|Tag|Template)$|\.php_ {
        deny all;
        }

    # Deny all attempts to access hidden files such as .htaccess, .htpasswd, .DS_Store (Mac).
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
        }

    # Virtuoso SPARQL endpoint
    location /sparql/ {
	proxy_pass http://localhost:8890;
	include /etc/nginx/proxy.conf;
	}

    # Django admin
    location /admin/ {
        proxy_pass http://127.0.0.1:9011;
	include /etc/nginx/proxy.conf;
        }

    location /static/ {
        root /home/javi/projects/muia_linkeddata/webapp/;
        }

    # phpMyAdmin
    location /phpmyadmin/ {
	proxy_pass http://127.0.0.1:8080;
	include /etc/nginx/proxy.conf;
        }

    # Ontology
    location /spec/ {
        root /home/javi/projects/muia_linkeddata/ontology/;
	}

    # Elda
    location / {
        proxy_pass http://localhost:8891;
        include /etc/nginx/proxy.conf;
        }
}
