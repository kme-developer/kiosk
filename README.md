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
[ option ]
// http://localhost:3000/api/manager/option
router.post('/option', isManager, optionController.createOption);
// http://localhost:3000/api/manager/option/:optionId
router.delete('/option/:optionId', isManager, optionController.deleteOption);

[ item ]
// http://localhost:3000/api/manager/item
router.post('/manager/item', isManager, itemController.postItem);
// http://localhost:3000/api/item
router.get('/item', itemController.getItem);
// http://localhost:3000/api/manager/item/:itemId
router.put('/manager/item/:itemId', isManager, itemController.updateItem);
// http://localhost:3000/api/manager/item/:itemId
router.delete('/manager/item/:itemId', isManager, itemController.deleteItem);
: 상품의 판매 이력(count)가 존재할 경우, 사용자에게 '판매 이력이 존재합니다. 삭제하시겠습니까?' 반환
// http://localhost:3000/api/manager/response/item/:itemId
router.delete('/manager/response/item/:itemId', isManager, itemController.deleteItemWithResponse);

[ order ]
// http://localhost:3000/api/order/:orderId
router.post('/order/:orderId', isUser, orderController.postOrder);
: 회원, 비회원만 주문이 가능함.
: `front-end`에서
{
  "itemIds": [1, 2],
  "amounts": [1, 1],
  "options": [{ "extra": 0, "shot": 1, "hot": false }, { "extra": 1, "shot": 2, "hot": false }]
}
: 이와 같은 형태로 넘어온다고 가정하였음.
: 주문이 생성된 후, 반복문을 통해 배열을 순회하면서 주문 상품들이 생성되는 구조.
: 최종적으로 주문자에게 주문 번호와 총합 가격을 반환.
// http://localhost:3000/api/manager/order
router.get('/manager/order', isManager, orderController.getOrderForManager);
: `state`를 입력했을 경우, 그에 해당하는 주문들만 반환
: 기본적으로 주문의 `id`를 기준으로 내림차순 정렬
// http://localhost:3000/api/user/:userId/order
router.get('/user/:userId/order', isUser, orderController.getOrderForUser);
: 기본적으로 주문의 `id`를 기준으로 내림차순 정렬
// http://localhost:3000/api/order/:orderId
router.get('/order/:orderId', orderController.getOrderForNotUser);
: 비회원 주문 조회 기능이므로 주문 번호를 입력해야만 조회가 가능
// http://localhost:3000/api/manager/order/:orderId/state
router.put('/manager/order/:orderId/state', isManager, orderController.updateState);
: `PENDING => COMPLETED`이 될 경우, 상품의 `count`가 1씩 증가
: `COMPLETED => CANCELED`(환불)이 될 경우, 상품의 `count`가 1씩 감소

[ user ]
// http://localhost:3000/api/user/signup
router.post('/signup', userController.postUser);
// http://localhost:3000/api/user/login
router.post('/login', userController.login);
// http://localhost:3000/api/user/:userId
router.delete('/:userId', isUser, userController.deleteUser);

[ manager ]
// http://localhost:3000/api/manager/signup
router.post('/signup', managerController.postManager);
// http://localhost:3000/api/manager/login
router.post('/login', managerController.login);
// http://localhost:3000/api/manager
router.delete('/', isManager, managerController.deleteManager);
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
