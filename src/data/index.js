export const mockData = () => {
    const areaArr = []
    for (let i = 1; i < 13; i++) {
        const area = {id: i, name: `地区${Math.random().toFixed(Math.ceil(Math.random() * 5))}`, children: []}
        for (let j = 1; j < Math.ceil(Math.random() * 8) + 1; j++) {
            area.children.push({id: i * 10 + j, name: `方位${j}`})
        }
        areaArr.push(area)
    }
    return areaArr
}
