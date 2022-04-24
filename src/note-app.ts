/* eslint-disable max-len */
import * as fs from 'fs';
import * as chalk from 'chalk';
import * as yargs from 'yargs';
import {Note} from './note';

/**
 * Function that allow us to add a note
 * @param {yargs.ArgumentsCamelCase} argv Argument received to add a note
 * @return {string} String that allow us to check if its working on tests
 */
export function addFunction(argv): string {
  if (typeof argv.title === 'string' && typeof argv.user === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
    const filename = argv.title.toLowerCase().replace(/[ ](.)/g, (_LowLine, chr) => chr.toUpperCase());
    const path: string = './users/' + argv.user;
    const notePath: string = path + '/' + filename + '.json';
    if (argv.color === 'red' || argv.color === 'green' || argv.color === 'blue' || argv.color === 'yellow' ) {
      if (fs.existsSync(path)) {
        if (fs.existsSync(notePath)) {
          console.log(chalk.red('Note title taken!'));
          return 'Note title taken!';
        } else {
          fs.appendFileSync(notePath, new Note(argv.user, argv.title, argv.body, argv.color).write());
          console.log(chalk.green('New note added!'));
          return 'New note added!';
        }
      } else {
        fs.mkdirSync(path);
        fs.appendFileSync(notePath, new Note(argv.user, argv.title, argv.body, argv.color).write());
        console.log(chalk.green('New note added!'));
        return 'New note added!';
      }
    } else {
      console.log(chalk.red('The color is not valid!'));
      return 'The color is not valid!';
    }
  }
}

/**
 * Function that allow us to list notes
 * @param {yargs.ArgumentsCamelCase} argv Argument received to list notes
 * @return {string} String that allow us to check if its working on tests
 */
export function listFunction(argv): string {
  if (typeof argv.user === 'string') {
    const path: string = './users/' + argv.user;

    if (fs.existsSync(path)) {
      console.log('Your notes');
      const pointer = fs.readdirSync(path);
      pointer.forEach((filename) => {
        const notePath: string = path + '/' + filename;
        const data = JSON.parse(fs.readFileSync(notePath, 'utf8'));
        const noteColour = data.color;
        switch (noteColour) {
          case 'red': {
            console.log(chalk.red.inverse(data.title));
            break;
          }
          case 'green': {
            console.log(chalk.green.inverse(data.title));
            break;
          }
          case 'blue': {
            console.log(chalk.blue.inverse(data.title));
            break;
          }
          case 'yellow': {
            console.log(chalk.yellow.inverse(data.title));
            break;
          }
        }
      });
      return 'Notes listed!';
    } else {
      console.log(chalk.red('The user dont have any notes in this system'));
      return 'The user dont have any notes in this system';
    // eslint-disable-next-line block-spacing
    // eslint-disable-next-line brace-style
    }
  }
}

/**
 * Function that allow us to read a note
 * @param {yargs.ArgumentsCamelCase} argv Argument received to read a note
 * @return {string} String that allow us to check if its working on tests
 */
export function readFunction(argv): string {
  if (typeof argv.user === 'string') {
    if (typeof argv.title === 'string') {
      const path: string = './users/' + argv.user;
      const title = argv.title.toLowerCase().replace(/[ ](.)/g, (_LowLine, chr) => chr.toUpperCase());
      const notePath: string = path + '/' + title + '.json';

      if (fs.existsSync(notePath)) {
        const data = JSON.parse(fs.readFileSync(notePath, 'utf8'));
        const noteColour = data.color;
        switch (noteColour) {
          case 'red': {
            console.log(chalk.red.inverse(data.title));
            console.log(chalk.red.inverse(data.body));
            break;
          }
          case 'green': {
            console.log(chalk.green.inverse(data.title));
            console.log(chalk.green.inverse(data.body));
            break;
          }
          case 'blue': {
            console.log(chalk.blue.inverse(data.title));
            console.log(chalk.blue.inverse(data.body));
            break;
          }
          case 'yellow': {
            console.log(chalk.yellow.inverse(data.title));
            console.log(chalk.yellow.inverse(data.body));
            break;
          }
        }
        return 'Note readed!';
      } else {
        console.log(chalk.red('Note not found'));
        return 'Note not found';
      }
    }
  }
}

/**
 * Function that allow us to remove a note
 * @param {yargs.ArgumentsCamelCase} argv Argument received to remove a note
 * @return {string} String that allow us to check if its working on tests
 */
export function removeFunction(argv): string {
  if (typeof argv.user === 'string') {
    if (typeof argv.title === 'string') {
      const path: string = './users/' + argv.user;
      const title = argv.title.toLowerCase().replace(/[ ](.)/g, (_LowLine, chr) => chr.toUpperCase());
      const notePath: string = path + '/' + title + '.json';

      if (fs.existsSync(notePath)) {
        fs.rmSync(notePath, {
          recursive: true,
        });
        console.log(chalk.green('Note removed!'));
        return 'Note removed!';
      } else {
        console.log(chalk.red('No note found'));
        return 'No note found';
      }
    }
  }
}

/**
 * Function that allow us to edit a note
 * @param {yargs.ArgumentsCamelCase} argv Argument received to edit a note
 * @return {string} String that allow us to check if its working on tests
 */
export function editFunction(argv): string {
  if (typeof argv.user === 'string') {
    if (typeof argv.title === 'string') {
      if (typeof argv.body === 'string') {
        const path: string = './users/' + argv.user;
        const title = argv.title.toLowerCase().replace(/[ ](.)/g, (_LowLine, chr) => chr.toUpperCase());
        const notePath: string = path + '/' + title + '.json';

        if (fs.existsSync(notePath)) {
          const data = JSON.parse(fs.readFileSync(notePath, 'utf8'));
          fs.writeFileSync(notePath, new Note(argv.user, argv.title, argv.body, data.color).write());
          console.log(chalk.green('Note edited!'));
          return 'Note edited!';
        } else {
          console.log(chalk.red('Note not found'));
          return 'Note not found';
        }
      }
    }
  }
}

/**
 * Add command that allow us to add a note from a user
 * into his directory of notes
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    addFunction(argv);
  },
});

/**
 * List command that allow us to list
 * all the notes from a specified user
 */
yargs.command({
  command: 'list',
  describe: 'List all the notes from a specific user',
  builder: {
    user: {
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    listFunction(argv);
  }, // Prevent duplicated lines
});

/**
 * Read command that allow us to read
 * a specified note from a user
 */
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    user: {
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    readFunction(argv);
  },
});

/**
 * Remove command that allow us
 * to remove a specified note from a user
 */
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    user: {
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    removeFunction(argv);
  },
});

/**
 * Edit command that allow us to
 * edit the body of a existing note
 */
yargs.command({
  command: 'edit',
  describe: 'Edit a note',
  builder: {
    user: {
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    editFunction(argv);
  },
});

/**
 * Parse function that allow the
 * program works correctly from
 * the command line
 */
yargs.parse();
