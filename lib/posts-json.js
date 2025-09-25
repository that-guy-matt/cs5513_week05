import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export function readJsonData(dataDir) {
    const filePath = path.join(dataDir, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObj = JSON.parse(jsonString);
    return jsonObj;
}

export function getSortedPostsData() {
    const jsonObj = readJsonData(dataDir);

    jsonObj.sort(function (a, b){
        return a.title.localeCompare(b.title);
    });

    return jsonObj.map(item => {
        return {
            id: item.id.toString(),
            title: item.title,
            date: item.date,
        }
    })
}

export function getAllPostIds() {
    const jsonObj = readJsonData(dataDir);
    return jsonObj.map(item => {
        return {
            params: {
                id: item.id.toString(),
            }
        }
    })
}

export function getPostData(id) {
    const jsonObj = readJsonData(dataDir);

    const objReturned = jsonObj.filter(obj => {
        return obj.id.toString() === id;
    })

    if (objReturned.length === 0 ){
        return {
            id: '',
            title: '',
            date: '',
            description: '',
            ingredients: '',
            instructions: '',
        }
    } else {
        return objReturned[0];
    }
}