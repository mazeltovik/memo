import { File, Directory } from 'expo-file-system/next';
import {
  Init,
  ChallengeSavingData,
  CountTestSavingData,
  MemoryTestSavingData,
} from './types';

export function isDirExist(directory: Directory, searchingDir?: string) {
  return searchingDir
    ? new Directory(directory, searchingDir).exists
    : new Directory(directory).exists;
}

export function createDir(directory: Directory, creatingDir: string) {
  try {
    new Directory(directory, creatingDir).create();
    return true;
  } catch (err) {
    throw new Error('Directory creation issue');
  }
}

export function createFile(
  directory: Directory,
  folder: string,
  fileName: string
) {
  try {
    const file = new File(directory, folder, fileName);
    file.create();
    console.log(file.uri);
    return true;
  } catch (err) {
    throw new Error(`File creation issue: ${fileName} file`);
  }
}

export function getData<T>(
  directory: Directory,
  folder: string,
  fileName: string
) {
  try {
    const file = new File(directory, folder, fileName);
    const currentJsonData = file.text();
    return currentJsonData.length? JSON.parse(currentJsonData) : null;
  } catch (err) {
    throw new Error(`File getting issue: ${fileName} file`);
  }
}

export function saveInit(
  directory: Directory,
  folder: string,
  fileName: string,
  data: Init
) {
  try {
    const file = new File(directory, folder, fileName);
    file.write(JSON.stringify(data));
    return true;
  } catch (err) {
    throw new Error(`Init file saving issue: ${fileName} file`);
  }
}

export function saveMainChallengeRes(
  directory: Directory,
  folder: string,
  fileName: string,
  data: ChallengeSavingData
) {
  try {
    const file = new File(directory, folder, fileName);
    const currentJsonData = file.text();
    let parsedData: ChallengeSavingData[] = [];
    if (!currentJsonData.length) {
      parsedData.push(data);
    } else {
      parsedData = JSON.parse(currentJsonData);
      const index = parsedData.findIndex(
        (item) => item.currentDay == data.currentDay
      );
      if (~index) {
        const searchingTestRes = parsedData[index];
        if (data.correct > searchingTestRes.correct) {
          parsedData[index] = data;
        }
      } else {
        parsedData.push(data);
      }
    }
    file.write(JSON.stringify(parsedData));
    return true;
  } catch (err) {
    throw new Error(`Main challenge saving issue: ${fileName} file`);
  }
}

export function saveCountTestRes(
  directory: Directory,
  folder: string,
  fileName: string,
  data: CountTestSavingData
) {
  try {
    const file = new File(directory, folder, fileName);
    const currentJsonData = file.text();
    let parsedData: CountTestSavingData[] = [];
    if (!currentJsonData.length) {
      parsedData.push(data);
    } else {
      parsedData = JSON.parse(currentJsonData);
      const index = parsedData.findIndex(
        (item) => item.currentDay == data.currentDay
      );
      if (~index) {
        const searchingTestRes = parsedData[index];
        if (data.time < searchingTestRes.time) {
          parsedData[index] = data;
        }
      } else {
        parsedData.push(data);
      }
    }
    file.write(JSON.stringify(parsedData));
    return true;
  } catch (err) {
    throw new Error(`File count test saving issue: ${fileName} file`);
  }
}

export function saveMemoryTestRes(
  directory: Directory,
  folder: string,
  fileName: string,
  data: MemoryTestSavingData
) {
  try {
    const file = new File(directory, folder, fileName);
    const currentJsonData = file.text();
    let parsedData: MemoryTestSavingData[] = [];
    if (!currentJsonData.length) {
      parsedData.push(data);
    } else {
      parsedData = JSON.parse(currentJsonData);
      const index = parsedData.findIndex(
        (item) => item.currentDay == data.currentDay
      );
      if (~index) {
        const searchingTestRes = parsedData[index];
        if (data.correct > searchingTestRes.correct) {
          parsedData[index] = data;
        }
      } else {
        parsedData.push(data);
      }
    }
    file.write(JSON.stringify(parsedData));
    return true;
  } catch (err) {
    throw new Error(`Memory test saving issue: ${fileName} file`);
  }
}

export function clearFile(
  directory: Directory,
  folder: string,
  fileName: string
) {
  try {
    const file = new File(directory, folder, fileName);
    file.write('');
    return true;
  } catch (err) {
    throw new Error(`Cleaning file issue: ${fileName} file`);
  }
}

export function deleteFolder(directory: Directory, deletingDir: string) {
  try {
    new Directory(directory, deletingDir).delete();
    return true;
  } catch (err) {
    throw new Error('Directory deleting issue');
  }
}
