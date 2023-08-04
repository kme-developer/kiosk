![KIOSK ERD](https://github.com/kme-developer/kiosk/assets/130229450/a55ce72d-b22b-4740-b3b4-454b98135fce)

```
* ERD *
[ option ]
: extra_price => `extra size`가 존재한다면 그에 대한 가격. 0일 경우 `extra size` 선택이 불가능한 상품.
: shot_price => `shot` 추가가 가능하다면 그에 대한 가격. 0일 경우 `shot` 추가가 불가능한 상품.
: hot => 만약 `true`로 설정되어 있을 시, 해당 상품은 선택지가 `hot, cold`로 2개. `false`로 설정되어 있을 시, 오직 `cold`만 가능.

[ item ]
: price => 상품 자체의 가격을 나타냄. `option`과는 관련 없음.
: type => ENUM을 이용해서 분류, 현재는 `ade, coffee, desert, tea`로 설정되어 있음.
: count => 현재까지 상품이 판매된 누적 갯수를 나타냄.

[ orderItem ]
: amount => `user`가 이 상품을 몇 개 주문했는지 나타냄.
: option => `user`를 통해 JSON 형태로 받게 되는 `option` 선택 내역. 예를 들어, `front-end`를 통해
{
  "extra": 1,
  "shot": 2,
  "hot": false
}
위의 형태로 넘어온다고 가정했음.
`extra`가 1이라는 것은 `extra size` 선택, `shot`이 2라는 것은 `shot`을 2번 추가, `hot`이 `false`이므로 `cold` 선택.
: price => 상품의 가격과 `option` 가격이 포함된 총합 가격.

[ order ]
: isUser => 현재 `user`가 회원인지 비회원인지 BOOLEAN 값으로 구분.
: state => 주문 상태를 ENUM을 이용해서 분류, `ordered, pending, completed, canceled`로 설정되어 있음.
```

```
* API *
```

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
