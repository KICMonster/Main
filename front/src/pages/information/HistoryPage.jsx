import BasicLayout from '../../layouts/BasicLayout';
import '../../component/main/styles/history.css';

function HistoryPage() {
    return (
        <BasicLayout>
            <main className='historyMain'>
                <img src="https://kr.imboldn.com/wp-content/uploads/2022/07/image-03-12-800x450.jpg" alt="칵테일 이미지" />
                <div className='historyFlex'>
                    <h1>칵테일의 역사</h1>
                    <p className='historyCocktail'>
                        칵테일은 술과 여러 종류의 음료, 첨가물 등을 섞어 만든 혼합주를 일컫는다. 다만, 무알콜 칵테일도 있으며 이들은 목테일(Mocktail, Mock과 Cocktail의 합성어)이라고 부른다.
                    </p>
                    <p className='historyCocktail'>
                        사람의 기호와 취향에 맞추어 독특한 맛과 빛깔을 낼 수 있다. 명칭의 유래에 대해서는 여러 가지 설이 있지만, 1795년쯤 미국 루이지애나주 뉴올리언스에 이주해온 페이쇼라는 약사가 달걀 등을 넣은 음료를 조합해서 만들어서 프랑스어의 coquetier라고 부른 데서 비롯되었다는 설이 유력하다.
                    </p>
                    <p className='historyCocktail'>
                        (혼합한 술에 닭 꼬리깃털(cock-tail)이 올려져 만들어진 단어라는 등의 설이 있다) 혼성음료를 만드는 습관은 미국에서 시작된 것이 아니고, 인도나 페르시아에서 펀치라는 혼성음료를 만들며 생겨났다. 그것이 스페인 사람에 의해 유럽으로 전파됐다고 한다.
                    </p>
                </div>
            </main>
        </BasicLayout>
    );
}

export default HistoryPage;