# ЗАПУСК проекта
На компьютере должен быть установлен docker и docker-compose.

## Запуск для DEV-разработки.
В терминале, открытом в корне проекта, необходимо набрать
>sudo docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build

## Запуск для PRODUCTION_mode.
>sudo docker-compose up --build

В броузере проект открывается на 
>localhost:80 или localhost (!).


# Остановка докера
>CTRL + C





# АРХИТЕКТУРА проекта
- База данных хранится в mongoDb(via mongoose) в db-сервисах докера.
- При инициации проекта в mongoDb загружаются демонстрационные данные из папки initialData.  
- Файлы изображений хранятся в diskStorage у api-сервиса докера. 
  При DEV-работе изображения синхронизированы с папкой проекта посредством volumes api-сервиса ./api/initialData:/usr/src/app/initialData

- При первом обращении пользователя к сайту - на бакенде генерируется sessionId via express-session.
  Далее sessionId сохраняется:
  = на сервере в mongoDb auth_db-сервиса via connect-mongo && mongoose,
  = на пользователе в cookie броузера.
  Запись cookie в броузере происходит через команду Set-Cookie in response первого request'a пользователя(запрос корзины).

- В течении всего времени, пока пользователь находится на сайте, корзина сохраняется во Vuex.
  Одновременно корзина сохраняется на backend'e в mongoDb(via mongoose).
- Привязка пользователя к его корзине, хранящейся на бакенде в mongoDb, происходит через sessionId.
  В результате этого пользователь способен вернуться к своей прежней корзине даже после перезапуска броузера.

- Перезагрузка броузера, когда мы находимся на произвольной странице сайта, к потере данных или редиректу на домашнюю страницу - не приводит.




# ДОПОЛНИТЕЛЬНО перед запуском полезные команды Docker'a.
Если проект уже ранее билдился (т.е. создавались контейнеры), но из другого места на компьютере,
то необходимо предварительно эти контейнеры удалить by

>sudo ps -a              //Все контейнеры в системе (включая остановленные контейнеры)
>sudo docker stop $(docker ps -a -q)
>sudo docker rm $(docker ps -a -q)

>sudo - иногда важно даже при root-правах, когда без sudo удаление не срабатывает.

Принудительно удалить все Docker-образы (ПОСЛЕ остановки и удаления контейнеров):
> docker images             //Список локальных образов в системе.
> docker rmi -f $(docker images -q)





# Удаление всех образов и контейнеров.
>sudo docker-compose down   //Остановить и УДАЛИТЬ контейнеры, сети, изображения и тома
>sudo docker-compose stop   //Остановить службы только.
>sudo docker ps -a              //Список всех контейнеров в системе (включая остановленные контейнеры).




# Для production_mode можно СЫМИТИРОВАТЬ ДОМЕННОЕ ИМЯ реального хостинга, например - sw.ru.
Для этого в nginx.conf.prod необходимо строку
  server_name localhost;
заменить на строку
  server_name sw.ru;

Если при этом мы работаем в разработке, на рабочем компьютере, то дополнительно совершаем следующее:
-открываем на компьютере файл
/etc/hosts
(на windows - c:\windows\system32\drivers\etc\hosts)

-добавляем в него новую строку
127.0.0.1 http://sw.ru
127.0.0.1 sw.ru

-что бы изменить права доступа к файлу hosts необходимо, когда терминал открыт по папке /etc/, забить
sudo chmod -R -f 777 ./hosts











