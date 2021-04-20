// vitalDateオブジェクトを返す
const vitalDate = () => ({
  id: '',
  day: '',
  weather: '',
  body_temp: '',
  condition: '',
  mood: '',
  sleep: '',
  breakfast: '',
})
const mood = [
  { value: '1', name: 'よい' },
  { value: '2', name: 'ふつう' },
  { value: '3', name: 'よくない' },
]
const sleep = [
  { value: '1', name: 'よく寝た' },
  { value: '2', name: '時々起きた' },
  { value: '3', name: '不眠' },
]
const breakfast = [
  { value: '1', name: '食べた' },
  { value: '2', name: '少し食べた' },
  { value: '3', name: '食べてない' },
]
const lunchAmount = [
  { value: '1', name: '1～3割' },
  { value: '2', name: '4～6割' },
  { value: '3', name: '7～9割' },
  { value: '4', name: '10割' },
]
const waterIntake = [
  { value: '1', name: '0～50ml' },
  { value: '2', name: '50～100ml' },
  { value: '3', name: '100～150ml' },
  { value: '4', name: '150～200ml' },
  { value: '5', name: '200～300ml' },
  { value: '6', name: '300～400ml' },
  { value: '7', name: '500ml～' },
]
const vol = [
  { value: '1', name: '多い' },
  { value: '2', name: 'ふつう' },
  { value: '3', name: '少ない' },
  { value: '4', name: 'ない' },
  { value: '5', name: 'その他' },
]
// const attack = [強直発作, 間代発作, ミオクロニー発作, 非定型欠神発作, 強直間代発作]
const attackDuration = [
  { value: '1', name: '～5秒' },
  { value: '2', name: '5～10秒' },
  { value: '3', name: '10～15秒' },
  { value: '4', name: '15～30秒' },
  { value: '5', name: '30～60秒' },
  { value: '6', name: '60秒～' },
]
// const aspirationPoint = [口, 鼻, 気管カニューレ]
// const aspirationColor = [透明, 白, 黄, 緑, 赤褐色]
// const aspirationType = [しょう液性, 粘ちょう性, 膿性, 血性]
const step = [
  { value: '1', name: '0～50歩' },
  { value: '2', name: '50～100歩' },
  { value: '3', name: '100～150歩' },
  { value: '4', name: '150～200歩' },
  { value: '5', name: '200～300歩' },
  { value: '6', name: '300～400歩' },
  { value: '7', name: '500～1000歩' },
  { value: '8', name: '1000歩～' },
]
// OpenWeatherAPIから受け取った天気状態とDB管理するための数値の対応
const wheatherEn = {
  Clear: 1,
  Clouds: 2,
  Rain: 3,
  Snow: 4,
}
// DBで数値化された天気状態と日本語の対応
const wheatherJp = {
  1: '晴れ',
  2: '曇り',
  3: '雨',
  4: '雪',
}
export default {
  vitalDate,
  mood,
  sleep,
  breakfast,
  lunchAmount,
  waterIntake,
  vol,
  // attack,
  attackDuration,
  // aspirationPoint,
  // aspirationColor,
  // aspirationType,
  step,
  wheatherEn,
  wheatherJp,
}
