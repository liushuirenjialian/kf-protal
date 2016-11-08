#！ /bin/bash
RUN_NGINX = "/usr/local/nginx/sbin/nginx"
# 测试是否能重启
/usr/local/nginx/sbin/nginx -t
if [ $? -eq 0 ]; then
      echo '配置文件正确'
      /usr/local/nginx/sbin/nginx -s reload
      if [ $? -eq 0 ]; then
      echo "重启成功"
      else
       /usr/local/nginx/sbin/nginx
       echo "启动成功"
      fi
else
# 停止
# /usr/local/nginx/sbin/nginx -s quit
echo '配置文件错误'
fi
