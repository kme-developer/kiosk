
```
kiosk
├─ .babelrc
├─ .gitignore
├─ .prettierrc.js
├─ migrations
│  ├─ 20230730072116-migration_items.js
│  ├─ 20230730072202-migration_orders.js
│  ├─ 20230730072207-migration_orderItems.js
│  ├─ 20230731025049-migration_options.js
│  ├─ 20230731051149-migration_users.js
│  └─ 20230731051316-migration_managers.js
├─ package-lock.json
├─ package.json
└─ src
   ├─ app.js
   ├─ cache
   │  ├─ cache.js
   │  └─ init.option.js
   ├─ controller
   │  ├─ index.js
   │  ├─ item.controller.js
   │  ├─ manager.controller.js
   │  ├─ option.controller.js
   │  ├─ order.controller.js
   │  ├─ test.controller.js
   │  └─ user.controller.js
   ├─ database
   │  ├─ enum.js
   │  ├─ index.js
   │  ├─ models
   │  │  ├─ item.js
   │  │  ├─ manager.js
   │  │  ├─ option.js
   │  │  ├─ order.js
   │  │  ├─ orderItem.js
   │  │  └─ user.js
   │  ├─ relations
   │  │  ├─ index.js
   │  │  ├─ item.relation.js
   │  │  ├─ option.relation.js
   │  │  ├─ order.relation.js
   │  │  ├─ orderItem.relation.js
   │  │  └─ user.relation.js
   │  └─ sequelize.js
   ├─ middleware
   │  ├─ isManager.middleware.js
   │  └─ isUser.middleware.js
   ├─ routes
   │  ├─ index.js
   │  ├─ item.js
   │  ├─ manager.js
   │  ├─ option.js
   │  ├─ order.js
   │  ├─ test.js
   │  └─ user.js
   ├─ seeders
   └─ service
      ├─ index.js
      ├─ item.service.js
      ├─ manager.service.js
      ├─ option.service.js
      ├─ order.service.js
      ├─ response.service.js
      └─ user.service.js

```
