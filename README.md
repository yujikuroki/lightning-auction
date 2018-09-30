# README

## start app

```
cp .env.sample .env
$EDITOR .env
npm install
npm start
```

http://localhost:3000

## DB設計
database: lightning_aution

table: user
* id
* address

table: invoice
* invoiceid
* userid
* amount
* status
* settleDTTM

#### status
0: pending
1: top
2: unrefund
3: refunded
9: expired

### コマンド
```
createdb lightning_auction_development
```
### SQL
```
create role root with superuser login;
```
