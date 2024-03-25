import fs from 'fs-extra';


export async function write(data: any, filePath: string): Promise<void> {
    try {
        let FinalData: any[] = [];
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            FinalData = JSON.parse(fileContent);
        } catch (err) { }

        FinalData.push(data);

        fs.writeFileSync(filePath, JSON.stringify(FinalData, null, 2));
        console.log(`записно в : ${filePath}`);
    } catch (e) {
        console.error(`ошибка записи данных: ${e}`);
    }
}