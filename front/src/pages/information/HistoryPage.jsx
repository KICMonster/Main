import BasicLayout from '../../layouts/BasicLayout';
import '../information/history.css';

function HistoryPage() {
    return (
        <BasicLayout>
            <div className='historyHeader'>
                <div className="historyImageContainer">
                    <img src="https://kr.imboldn.com/wp-content/uploads/2022/07/image-03-12-800x450.jpg" alt="칵테일 이미지" />
                </div>
                <div className='historyContent'>
                    <div className='history_name'>
                        <h1>칵테일의 역사</h1>
                    </div>
                </div>
            </div>
            <main className='historyMain'>
                <div className='contentBox'>
                    <p className='historyCocktail'>
                        칵테일은 술과 여러 종류의 음료, 첨가물 등을 섞어 만든 혼합주를 일컫는다.
                        다만, 무알콜 칵테일도 있으며 이들은 목테일(Mocktail, Mock과 Cocktail의 합성어)
                        이라고 부른다. 사람의 기호와 취향에 맞추어 독특한 맛과 빛깔을 낼 수 있다.
                        명칭의 유래에 대해서는 여러 가지 설이 있지만, 1795년쯤 미국 루이지애나주
                        뉴올리언스에 이주해온 페이쇼라는 약사가 달걀 등을 넣은 음료를 조합해서 만들어서
                        프랑스어의 coquetier라고 부른 데서 비롯되었다는 설이 유력하다.
                        (혼합한 술에 닭 꼬리깃털(cock-tail)이 올려져 만들어진 단어라는 등의 설이 있다)
                        혼성음료를 만드는 습관은 미국에서 시작된 것이 아니고, 인도나 페르시아에서 펀치라는
                        혼성음료를 만들며 생겨났다. 그것이 스페인 사람에 의해 유럽으로 전파됐다고 한다.
                    </p>
                </div>
                <div className='contentBox'>
                    <h2>역사</h2>
                    <p>
                        고대 ~ 중세
                        맥주에다 벌꿀이나 과즙을 타서 마셨고 로마시대 때에는 포도주에다 물을 타서 마셨다. 
                        이렇게 간단하게 섞어서 마신 원시적인 방법이 칵테일의 시작이며, 이때는 쉐이커나 믹싱 
                        글라스 등의 기구를 사용한 것이 아니라 그냥 재료를 섞어서 맛을 변화시켜 마신 것이 전부였다. 
                        중국 당나라시대에서는 와인에다 마유 등을 섞은 유산 음료도 칵테일의 일종이라고도 하며, 
                        중세에는 추위를 이기기 위하여 향료를 섞어 뜨겁게 마셨으며, 아라크에다 설탕, 물, 라임, 향료를 
                        섞은 펀치가 만들어졌다. 이때까지 양조주만을 주재료로 하여 섞어 마시던 것이 중세에 들어서 
                        연금술사들이 만든 증류주로 인하여 믹스드 드링크에도 큰 발전이 시작되었다. 18세기 중반에 들어서서 
                        이런 혼합 음료를 칵테일이라는 이름으로 부르게 되었다.

                        근대 ~ 현대
                        제1차 세계 대전 때 미군들이 유럽에 보급시켰고, 20세기 초반 미국의 금주법 시대때 일자리를 잃은 많은 
                        바텐더들이 유럽으로 건너가서 유럽에 칵테일을 활성화 시켰다. 얼음을 사용한 칵테일이 대중화된 것은 
                        19세기 후반 독일의 카알 폰 린데가 인공 제빙기를 개발하면서부터이다. 한국은 8.15 광복과 함께 서양 
                        문물이 들어오고 6.25전쟁 이후 미군들에 의해서 칵테일이 서서히 보급되기 시작하여 오늘날에 이르고 있다.
                    </p>
                </div>
            </main>
        </BasicLayout>
    );
}

export default HistoryPage;