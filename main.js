var mqtt = require('mqtt');
var topic = "------序列号-----";
var CONTROL_MARK = "ctr";
var RECV_MARK = "state";
var content = "----命令-------如：setr=2222222222";
var broker = "tcp://api.netrelay.cn:1883";
var appsecret = "----appsecret----";
//连接mqtt服务器
var client = mqtt.connect(broker,{
    clientId: appsecret
});
//监听连接
client.on('connect', function (req, res) {
    //订阅消息
    client.subscribe(topic+RECV_MARK);
    //发送命令
    client.publish(topic+CONTROL_MARK,content)
});
//监听消息
client.on('message', function (topic, message) {
    //返回内容
    console.log(message.toString())

    //以下内容根据实际决定是否需要
    //取消订阅
    client.unsubscribe(topic+RECV_MARK);
    //断开连接
    client.end();
});

//MQTT库地址：https://www.npmjs.com/package/mqtt