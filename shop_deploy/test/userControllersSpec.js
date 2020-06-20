'use strict';

const chai = require('chai'); // chaiをロード
const expect = chai.expect;

const usersController = require('../controllers/usersController');
mocha spec.js -r chai / register-expect
const app = require('../main');

chai.use(chaiHTTP);

describe("usersController", () => {
  describe("/users GET", () => {
    it("すべてのユーザーを取得する必要があります。", done => {
      chai
        .request(app)
        .get("/users")
        .end((errors, res) => {
          expect(res).to.have.status(200);
          expect(errors).to.be.equal(null);
          done();
        });
    });
  });
 
  // テストの対象をdescribeブロックで定義する
  describe("getUserParams", () => {
    it("ユーザオブジェクトの名前属性を含むようにリクエストボディを変換しなければなりません。", () => {
      var body = {
        first: "Jon",
        last: "Wexler",
        email: "jon@jonwexler.com",
        password: 12345,
        zipCode: 10016
      };
      expect(usersController.getUserParams(body)).to.deep.include({
        name: {
          first: "Jon",
          last: "Wexler"
        }
      });
    });

    it("空のリクエストボディ入力を持つ空のオブジェクトを返すべきです。", () => {
      var emptyBody = {};
      expect(usersController.getUserParams(emptyBody)).to.deep.include({});
    });
  });
});
