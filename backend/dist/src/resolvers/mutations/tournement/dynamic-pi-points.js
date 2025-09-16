/**
 * Tournament-д үлдсэн сурагчдын тооноос хамаарч байр, хувь оноог автоматаар тооцоолно
 */
export function allocatePiPointsDynamic(students, // Оролцогчдын ID
totalPiPoints) {
    const results = [];
    const total = students.length;
    // Байрын хувийг dynamic тогтооно
    const percentages = [];
    if (total >= 8) {
        // 1-35%, 2-20%, 3-4 15%, 5-8 7.5%
        percentages.push(35, 20, 15, 15, 7.5, 7.5, 7.5, 7.5);
    }
    else if (total === 5) {
        percentages.push(35, 20, 15, 15, 7.5);
    }
    else if (total === 4) {
        percentages.push(35, 20, 15, 15);
    }
    else if (total === 2) {
        percentages.push(35, 20);
    }
    else if (total === 1) {
        percentages.push(35);
    }
    else {
        // Бусад тохиолдолд бүх оролцогчид 5% авна
        for (let i = 0; i < total; i++)
            percentages.push(5);
    }
    for (let i = 0; i < total; i++) {
        const points = Math.floor((totalPiPoints * percentages[i]) / 100);
        results.push({
            studentId: students[i],
            points,
            place: i + 1,
        });
    }
    return results;
}
