const sex = ['男', '女', '適用不能']
const breath = ['多い', 'ふつう', '少ない']
const mood = ['よい', 'ふつう', 'よくない']
const sleep = ['よく寝た', '時々起きた', '不眠']
const breakfast = ['食べた', '少し食べた', '食べてない']
const lunchAmount = ['1～3割', '4～6割', '7～9割', '10割']
const waterIntake = [
  '0～50ml',
  '50～100ml',
  '100～150ml',
  '150～200ml',
  '200～300ml',
  '300～400ml',
  '500ml～',
]
const vol = ['多い', 'ふつう', '少ない', 'ない', 'その他']
const attack = [
  '強直発作',
  '間代発作',
  'ミオクロニー発作',
  '非定型欠神発作',
  '強直間代発作',
]
const attackDuration = ['～5秒', '5～10秒', '10～15秒', '15～30秒', '30～60秒', '60秒～']
const aspirationPoint = ['口', '鼻', '気管カニューレ']
const aspirationColor = ['透明', '白', '黄', '緑', '赤褐色']
const aspirationType = ['しょう液性', '粘ちょう性', '膿性', '血性']
const step = [
  '0～50歩',
  '50～100歩',
  '100～150歩',
  '150～200歩',
  '200～300歩',
  '300～400歩',
  '500～1000歩',
  '1000歩～',
]
const weather = ['晴れ', '曇り', '雨', '雪']

const bool = [
  { value: false, name: '無' },
  { value: true, name: '有' },
]

// 配列をセレクトボックスに入れるオブジェクト配列に変換
const selectList = (list) => {
  // ebal()は文字列を変数名の宣言に変換する。1から順にvalueに振り番する
  let selectlist = eval(list).map((data, key) => ({ value: key + 1, name: data }))
  return selectlist
}

// 数値化したプロパティを対応の配列で文字に変換
const selectStr = (v) => {
  let list = selectList(Object.keys(v)[0]).find(
    (data) => data.value === Object.values(v)[0]
  )
  // 算出プロパティで使用された場合、createdでデータが入る前に処理されるので、空の場合はlist.nameせず''を返す
  return !!list ? list.name : ''
}

export default {
  computed: {
    // 算出プロパティの関数で、returnする関数に引数を入れると、算出プロパティが引数を受付けるようになる
    selectList() {
      return (object) => {
        return selectList(object)
      }
    },
    selectStr() {
      return (object) => {
        return selectStr(object)
      }
    },
    bool() {
      return bool
    },
  },
}
