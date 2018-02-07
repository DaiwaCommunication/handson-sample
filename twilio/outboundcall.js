/*
このプログラムはsakura.ioとTwilioとのコラボハンズオンにおいて、Twilio Functionsと連携させるためのものです。
こちらで生成されたURLをsakura.ioのOutgoing Webhookで指定することにより、sakura.ioで取得されたセンサデータはJSONデータとして本プログラムで処理されます。

本プログラムの動作に必要なパッケージはありません。

パラメータは以下のように指定します。
PATH : /outboundcall
ACCESS CONTROL ： チェックなし
EVENT ： 指定なし
*/
exports.handler = function(context, event, callback) {
  // 受信したJSONデータに含まれるモジュールIDと、Functionsで指定した環境変数（MODULE_ID）を照合　Verification of module ID
  var moduleId = event.module || '';
  // 一致していた場合のみ、環境変数（TO_NUMBER&FROM_NUMBER）で指定した番号に架電　If the ID matches, call to the specified phone number
  if (moduleId === context.MODULE_ID) {
    var client = context.getTwilioClient();
    client.calls.create({
      // 別途作成するプログラム（ivr）を実行　Execute separately created program
      url: 'https://'+context.DOMAIN_NAME+'/ivr',
      to: context.TO_NUMBER,
      from: context.FROM_NUMBER,
    })
    .then((call) => callback(null, call.sid))
    .catch((error)=> callback(error))
  } else {
    callback(null, 'moduleId was unmatch')
  }
};