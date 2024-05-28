import { useEffect, useState } from "react";
import CraftList from "../../component/list/CraftList";
import "../../component/list/CraftList.css";
import "../information/Craft.css";
import { useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

function CraftPage() {
    const { key } = useParams();
    const [isMensuration, setIsMensuration] = useState(false);
    const [isStrainer, setIsStrainer] = useState(false);
    const [isGlass, setIsGlass] = useState(false);
    const [isCocktail, setIsCocktail] = useState(false);

    useEffect(() => {
        setIsMensuration(false);
        setIsStrainer(false);
        setIsGlass(false);
        setIsCocktail(false);

        switch (key) {
            case 'mensuration':
                setIsMensuration(true);
                break;
            case 'strainer':
                setIsStrainer(true);
                break;
            case 'glass':
                setIsGlass(true);
                break;
            case 'cocktail':
                setIsCocktail(true);
                break;
            default:
                break;
        }
    }, [key]);

    return (
        <BasicLayout>
            <div className="crafts-container">
                <main className="crafts">
                    {/* 계량 */}
                    {isMensuration && (
                        <div className="mensuration-section">
                            <div className="image-container">
                                <h1>칵테일 계량</h1>
                                <img src="https://moninkorea.kr/images/techniques/techniques_con06.png" alt="Mensuration" />
                            </div>
                            <div className="text-container">
                                <h4>파트</h4>
                                <p>칵테일은 ‘파트’의 단위로 계량합니다. 파트는 작은 양이나 큰 양 모두에 적용되는 상대적인 개념의 간단한 계량 단위입니다. 예를 들어, 레시피에서 A 재료 1파트, B 재료 2파트라고 한다면 B 재료를 두 배 정도 더 넣으면 됩니다.</p>
                                <h4>대시/스플래시</h4>
                                <p>대시는 스플래시보다 큰 개념이지만 둘 다 적은 양을 나타냅니다. 대시나 스플래시는 칵테일에 향신료를 사용할 때 사용되는 단위로써, 약간 주관적인 판단이 필요합니다. 스플래시는 믹서와 같은 희석 음료와 같은 점성액 향신료에 사용되며 대쉬는 타바스코 같은 강한 향신료에 사용됩니다.</p>
                                <h4>지그러</h4>
                                <p>지그러는 일반적으로 양 끝이 두 개의 원뿔 형태로 구성된 금속 계량 도구입니다.</p>
                                <h4>아래의 칵테일 용어 및 계량 단위에 익숙해져보세요.</h4>
                                <p>지그러: 1 1/2 온스 (야드파운드법) 2.4 센티리터 (미터법) 컵: 8 온스 (야드파운드법) 24 센티리터 (미터법) 테이블스푼: 1/2 온스 (야드파운드법) 1.5 센티리터 (미터법)</p>
                            </div>
                        </div>
                    )}
                    {/* 스트레이너 */}
                    {isStrainer && (
                        <div className="mensuration-section">
                        <div className="image-container">
                        <h1>쉐이커와 스트레이너</h1>
                            <img src="https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2021/06/1200/675/iStock-1223053251.jpg?ve=1&tl=1" alt="Strainer" />
                            </div>
                            <div className="text-container">
                            <h4>보스턴 쉐이커</h4>
                            <p>보스턴 쉐이커는 칵테일 재료를 섞거나 차갑게 만들 때 사용됩니다. 보스턴 쉐이커는 두 부분으로 구성되어 있습니다. 메탈 글래스와 믹 싱 글래스입니다. 믹싱 글래스에 얼음과 술을 넣습니다. 메탈 글래스를 얼음 글래스 위에 잘 맞게 올린 뒤 눌러 뚜껑처럼 살짝 닫아줍니다. 그리고 흔들어주세요. 혼합한 칵테일을 글래스에 잘 따르려면 별도로 스트레이너가 필요합니다.</p>
                            <h4>호손 스트레이너</h4>
                            <p>호손 스트레이너는 얼음 덩어리와 과일 덩어리가 칵테일에 들어가지 않도록 하기 위해 가장자리가 나선형 모양으로 되어 있습니다. 쉐이커를 구입하면 대개 스트레이너도 함께 들어 있습니다. 호손 스트레이너가 없을 때는 일반 주방용 스트레이너를 사용해도 괜찮습니다.</p>
                            <h4>줄렙 스트레이너</h4>
                            <p>손잡이가 달린 그릇같이 생긴 줄립 스트레이너는 알맞은 각도로 넣으면 믹싱 글래스나 쉐이커에 입구에 꼭 들어맞을 겁니다. 스트레이너 구멍을 통해서 술이 나오게 됩니다.</p>
                            </div>
                        </div>
                    )}
                    {/* 글래스 타입 */}
                    {isGlass && (
                        <div className="mensuration-section">
                        <div className="image-container">
                        <h1>글래스 타입</h1>
                            <img src="https://ae01.alicdn.com/kf/S229097a9b6194e96a1877f2c59e764302/-.jpg" alt="Glass" />
                            </div>
                            <div className="text-container">
                            <h4>글래스</h4>
                            <p>일자 형태로 위아래가 짧은 글래스는 기존 스타일의 텀블러, 간단하게는 위스키 글래스라고도 합니다. 약 7액량 온스(200밀리미터)를 담을 수 있는 락 글래스는 도수가 높은 술과 스트레이트 스피리츠 온더락에 사용합니다.</p>
                            <h4>하이볼 글래스</h4>
                            <p>최근 들어 술을 담는 데 하이볼 글래스가 가장 많이 사용되고 있습니다. 하이볼 글래스는 보통 약 7액량 온스를 담을 수 있습니다. (200밀리미터) 콜린 글래스는 약간 더 길고 얇은 일종의 하이볼 글래스입니다.</p>
                            <h4>샷 글래스</h4>
                            <p>집에서 사용하는 가장 작은 글래스로 주로 손님을 대접할 때 사용합니다. 계량컵으로 편리하게 쓰이기도 하는 샷 글래스에는 1.5~2액량 온스를 담을 수 있습니다. (40-60밀리리터) 슈터나 포니 글래스라고도 불립니다.</p>
                            <h4>차가운 글래스</h4>
                            <p>슈터와 락 글래스는 잔을 미리 차갑게 만들어 놓으면 아주 좋습니다. 차가운 글래스에 담긴 칵테일은 차갑고 상큼한 맛이 더 오래 가며 잔을 내올 때도 시각적인 측면에서 더 부각됩니다. 급속 냉각을 한 경우에도 일반 글래스보다는 차가운 글래스가 더 좋습니다.</p>
                            </div>
                        </div>
                    )}
                    {/* 칵테일 */}
                    {isCocktail && (
                        <div className="mensuration-section">
                        <div className="image-container">
                        <h1>클래식 칵테일</h1>
                            <img src="https://media.licdn.com/dms/image/D4D12AQH_-sGrEuLQWQ/article-cover_image-shrink_600_2000/0/1694592752587?e=2147483647&v=beta&t=BGcAOvsLF1eKf6aNYFhqFd-efwU6g1C-D-QbpxDq2UY" alt="Cocktail" />
                            </div>
                            <div className="text-container">
                            <h4>커스텀</h4>
                            <p>지금까지 홈 바 채우기, 바텐딩 필수 도구, 쉐이커 등에 대한 기사를 읽어보셨을 겁니다. 기초는 모두 다졌으니 이제 더 재밌는 부분으로 들어갈 수 있습니다. 도구와 재료를 갖췄으니 이제 여러분에게 필요한 것은 레시피입니다. 오랜 시간동안 전 세계의 바텐더들은 흔들고 휘저으며 클래식 칵테일을 바탕으로 자신만의 개성이 담긴 칵테일을 만들어냈죠. 이제 마침내 여러분도 함께 그 파티를 즐길 시간입니다.</p>
                            </div>
                            </div>
                        
                    )}
                </main>

                <footer>
                    <CraftList />
                </footer>
            </div>
        </BasicLayout>
    );
}

export default CraftPage;
