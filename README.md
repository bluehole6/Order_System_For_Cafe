# Order system (For owner and customer of cafe)

## 프로젝트 계기

우리나라의 커피 소비량이 급격하게 늘면서, 카페 또한 기하급수적으로 늘고 있습니다. 이러한 상황에 맞춰 저도 카페의 한 고객으로서 불편했던 점으로부터 시작된 프로젝트입니다.
예를 들어, 3층으로 된 카페의 경우 총 다섯번 계단을 오르내립니다.
1. 1, 2층에 자리가 없어 3층에 올라가 자리를 먼저 잡습니다.
2. 1층으로 내려와 음료를 주문합니다. 
3. 이때, 여러 음료를 주문했다면, 다시 3층에 올라가 잠시 기다립니다.
4. 진동벨이 울리면 1층에 내려와 음료를 픽업합니다.
5. 다시 3층으로 올라갑니다.

이처럼 저와 같은 카페의 고객들이 느낄 불편함을 해소하기 위해 웹을 통한 카페 주문시스템을 고안하였습니다.

## 주문 시스템

1. 고객은 자리를 잡고 앉은 자리에서 본인의 스마트 기기를 통해 카페 웹사이트에 접속합니다. 그 후, 본인이 주문할 음료 또는 디저트 등을 선택하고 장바구니에 담아 결제를 합니다.
2. 결제가 완료되면, 주문 정보가 관리자 페이지로 넘어가 카운터에서는 주문된 음료 또는 디저트를 만듭니다.
3. 주문된 음료 또는 디저트가 완성되면 주문 관리 페이지의 알림 버튼을 통해 해당 고객의 스마트 기기로 알림을 보냅니다. (Socket.io)

## 시스템의 장점

1. 고객은 자리에 앉아 편하게 주문이 가능합니다.
2. 사람이 많아도 주문을 위해 카운터에서 줄을 설 필요가 없습니다.
3. 몸이 불편하신 경우, 계단을 적게 오르내릴 수 있습니다.
4. 관리자는 관리자 페이지를 통해 간편하게 매출 관리, 주문 관리, 회원 관리 등을 할 수 있습니다.
5. 주문 기록이 바로 데이터로 저장되기 때문에, 고객과 직원과의 마찰이 줄어들 수 있습니다.
6. 진동벨을 사용할 필요가 없습니다.

## 데이터베이스 테이블 구조 (ER 다이어그램)

![Untitled Diagram (1)](https://user-images.githubusercontent.com/43440449/95013015-51042380-0678-11eb-814f-3a18ac241a6b.jpg)
