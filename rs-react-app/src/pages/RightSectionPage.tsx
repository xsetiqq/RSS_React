import { useParams } from 'react-router-dom';

function DetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h2>Детали для {id}</h2>
      <p>Здесь отображается информация о выбранном элементе.</p>
    </div>
  );
}

export default DetailPage;
