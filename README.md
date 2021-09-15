# [React Three Fiber Drone Animation](https://michiharu.github.io/React-Three-Fiber-Drone-Animation/)

React Three Fiber でカッコいいものを作ってみたくて開発しました。

[React Three Fiber Drone Animation](https://michiharu.github.io/React-Three-Fiber-Drone-Animation/)

開発は20時間ぐらいです。

ドローンっぽい運行データを作るのに3時間ぐらい試行錯誤しました。運行データ生成はpythonで書いています。

速度ベクトルを乱数で変化させて自然なデータが生成されるようにしました。

2020年の春に９割ほど開発し、ずっと作りかけでした。
転職活動で見せれるように最近仕上げました。

そのため使っているライブラリーが少し古めです。

## ライブラリー

- react
- three
- react-three-fiber
- MUI v4
- redux

## 工夫したポイント

- 緯度経度データを受け取ってシミュレーション出来る（いまのところ日本限定）
- データの間隔が約1秒ずつでも滑らかに動く
