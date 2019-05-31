var mqtt = require('mqtt');
var topic = "------序列号-----";
var CONTROL_MARK = "ctr";
var RECV_MARK = "state";
var content = "setr=2222222222";
var broker = "tcp://----服务器密码----:1883";
var username = "----您的用户----";
var password = "----您的密码----";
//连接mqtt服务器
var client = mqtt.connect(broker,{
    username: username,
    password: password,
    clientId: username
});
//监听连接
client.on('connect', function (req, res) {
    console.log('mqtt...connect...success...')
    //订阅消息
    client.subscribe(topic+RECV_MARK);
    //发送命令
    client.publish(topic+CONTROL_MARK,content)
});
//监听消息
client.on('message', function (topic, message) {
    //返回内容
    console.log(message.toString())
    //取消订阅
    client.unsubscribe(topic+RECV_MARK);
    //断开连接
    client.end();
});