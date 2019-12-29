let db = require('./config')
const Web3 = require('web3');
// const web3 = new Web3(
//     'https://ropsten.infura.io/v3/c4e4d78d4b3942baa19f426a45d783d0'
// );
let DEBUG = false;

let web3 = new Web3();
web3.setProvider(new Web3.providers.WebsocketProvider('https://ropsten.infura.io/v3/c4e4d78d4b3942baa19f426a45d783d0'));
//web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/v3/c4e4d78d4b3942baa19f426a45d783d0'));

console.log('web3 ', web3);
//web3.eth.getAccounts().then(console.log);
console.log('getAccounts',web3.eth.getAccounts());
if(!web3.isConnected()){
    console.log('web3.isConnected is failed');
    //throw new Error('unable to connect to ethereum node at ' + infuraUri);
} else {
    console.log('web3.isConeected!');
}

const PMTokenCA = '0xf9de7b53546cdcf5192f2f5a20d3dcd7c91f71eb';
const PMTokenABI = [
    {
        constant: false,
        inputs: [
            {
                name: '_spender',
                type: 'address',
            },
            {
                name: '_value',
                type: 'uint256',
            },
        ],
        name: 'approve',
        outputs: [
            {
                name: '',
                type: 'bool',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_spender',
                type: 'address',
            },
            {
                name: '_subtractedValue',
                type: 'uint256',
            },
        ],
        name: 'decreaseApproval',
        outputs: [
            {
                name: '',
                type: 'bool',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_spender',
                type: 'address',
            },
            {
                name: '_addedValue',
                type: 'uint256',
            },
        ],
        name: 'increaseApproval',
        outputs: [
            {
                name: '',
                type: 'bool',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_to',
                type: 'address',
            },
            {
                name: '_value',
                type: 'uint256',
            },
        ],
        name: 'transfer',
        outputs: [
            {
                name: '',
                type: 'bool',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_from',
                type: 'address',
            },
            {
                name: '_to',
                type: 'address',
            },
            {
                name: '_value',
                type: 'uint256',
            },
        ],
        name: 'transferFrom',
        outputs: [
            {
                name: '',
                type: 'bool',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                name: 'spender',
                type: 'address',
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256',
            },
        ],
        name: 'Approval',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'from',
                type: 'address',
            },
            {
                indexed: true,
                name: 'to',
                type: 'address',
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256',
            },
        ],
        name: 'Transfer',
        type: 'event',
    },
    {
        constant: true,
        inputs: [
            {
                name: '_owner',
                type: 'address',
            },
            {
                name: '_spender',
                type: 'address',
            },
        ],
        name: 'allowance',
        outputs: [
            {
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                name: '_owner',
                type: 'address',
            },
        ],
        name: 'balanceOf',
        outputs: [
            {
                name: 'balance',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
            {
                name: '',
                type: 'uint8',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'INITIAL_SUPPLY',
        outputs: [
            {
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [
            {
                name: '',
                type: 'string',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
            {
                name: '',
                type: 'string',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
];
let vc = new web3.eth.Contract(PMTokenABI, PMTokenCA);
let tokenAdmin = '0x6ceF05eefC7A51B5b7Cd0De37d7B722F12f8259A';

if (DEBUG) {
    console.log('PMTokenABI ', PMTokenABI);
    console.log('PMTokenCA ', PMTokenCA);
}

module.exports = function (app) {

    // id 중복 확인
    app.post("/user/check/id", function (req, res) {
        let m_user_id = req.body.user_id;

        db.connetion.query('select user_id from user_info where user_id = ?;', [m_user_id], function (err, rows, fields) {
            if (DEBUG) {
                console.log('rows :', rows);
                console.log('fields :', fields);
            }

            if (err) {
                res.send({
                    result_code: 500,
                    message: "에러"
                });
            }
            else {
                if (rows[0]) {
                    res.send({
                        result_code: 503,
                        message: "중복된 아이디 존재"
                    });
                }
                else {
                    res.send({
                        result_code: 200,
                        message: "가입 가능한 아이디"
                    });
                }
            }
        });
    });

    // 닉네임 중복 확인
    app.post("/user/check/nickname", function (req, res) {
        let m_nickname = req.body.nickname;

        db.connetion.query('select nickname from user_info where nickname = ?;', [m_nickname], function (err, rows, fields) {
            if (err) {
                res.send({
                    result_code: 500,
                    message: "에러"
                });
            }
            else {
                if (rows[0]) {
                    res.send({
                        result_code: 503,
                        message: "중복된 닉네임 존재"
                    });
                }
                else {
                    res.send({
                        result_code: 200,
                        message: "가입 가능한 닉네임"
                    });
                }
            }
        });
    });

    // 회원가입
    app.post("/user/register", function (req, res) {
        let m_user_id = req.body.user_id;
        let m_nickname = req.body.nickname;
        let m_password = req.body.password;
        let m_wallet_address = req.body.wallet_address;
        let m_email = req.body.email;
        let m_game_id = req.body.game_id;

        if (DEBUG) {
            console.log("user_id", m_user_id);
            console.log("m_nickname", m_nickname);
            console.log("m_password", m_password);
            console.log("m_wallet_address", m_wallet_address);
            console.log("m_email", m_email);
            console.log("m_game_id", m_game_id);
        }

        // DB에 저장
        db.connetion.query('insert into user_info(user_id, nickname, password, wallet_address, email, link_address, game_id) values (?,?,?,?,?, "http://52.78.198.204:3000/' + m_user_id + '",?);', [m_user_id, m_nickname, m_password, m_wallet_address, m_email, m_game_id], async function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.send({
                    result_code: 503,
                    message: '회원가입 실패'
                });
            }
            else {
                // 회원가입 성공 시 토큰 전송
                console.log("vc:", vc);
                let token = web3.toWei(5, 'ether');

                //vc.methods.transfer(m_wallet_address).call();
                
                vc.methods.transfer(
                    m_wallet_address,
                    token,
                ).call().then(
                    result => {
                        console.log('ddd');

                    }
                    //killAmount,
                    // { from: tokenAdmin, gas: 2000000 }, 
                    // function (err, result) {
                    //     if (err) console.log(err);
                    //     else console.log(result);
                    // }
                )
                

                // await vc.transfer(
                //     m_wallet_address,
                //     3,
                //     //killAmount,
                //     { from: tokenAdmin, gas: 2000000 }, 
                //     function (err, result) {
                //         if (err) console.log(err);
                //         else console.log(result);
                //     }
                // );
                res.send({
                    result_code: 200,
                    message: '회원가입 성공'
                });
            }
        });
    });

    // 로그인
    app.post("/user/login", function (req, res) {
        let m_user_id = req.body.user_id;
        let m_password = req.body.password;

        // DB에 저장된 내용과 비교
        db.connetion.query('select user_id, password from user_info where user_id = ? and password = ?;', [m_user_id, m_password], function (err, rows) {
            if (err) {
                console.log(err);
                res.send({
                    result_code: 500,
                    message: "에러"
                });
            }
            else {
                if (rows.length > 0) {
                    // 세션 데이터 저장
                    req.session.logined = true;
                    req.session.user_id = m_user_id;
                    // session store 저장 시작
                    // 저장이 끝난 뒤 redirect
                    req.session.save(() => {
                        res.send({
                            result_code: 200,
                            message: "로그인 성공"
                        });
                    });
                }
                else {
                    res.send({
                        result_code: 503,
                        message: "로그인 실패"
                    });
                }
            }
        });
    });

    // 로그아웃
    app.get('/user/logout', function (req, res) {
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    });

    // 비밀번호 찾기 (로그인 전)
    app.put("/user/password/find", function (req, res) {
        let m_user_id = req.body.user_id;
        let m_email = req.body.email;

        res.send({
            result_code: 200,
            message: '회원가입 성공'
        });
    });

    // 비밀번호 변경 (로그인 후)
    app.put("/user/password/change", function (req, res) {

    });

    // 서비스 탈퇴
    app.post("/user/leave", function (res) {
        res.send({
            result_code: 200,
            message: '회원가입 성공'
        });
    });
}