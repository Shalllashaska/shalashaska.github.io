const tableItem = document.querySelector('.table-item');
const leader = document.querySelector('.leader-player');
const table = document.querySelector('.table');

window.onload = () => {
    const players = db.collection("players");
    const query = players.orderBy("Score", "desc");
    table.innerHTML = '';
    let number = 1;
    return query.get().then(res => {
        res.forEach(item => {
            const data = item.data();
            const newItem = tableItem.cloneNode(true);
            const name = newItem.querySelector('.name');
            const score = newItem.querySelector('.score');
            const map = newItem.querySelector('.map');
            name.innerHTML =  `${number}. ${data.Name}`;
            score.innerHTML = data.Score;
            map.innerHTML = 'Castle';
            if (number === 1) {
                const arr = data.Name.toUpperCase().split('')
                arr.pop();
                leader.innerHTML = arr.join(' ');
            }
            number++;
            table.appendChild(newItem);
        })
    })
}