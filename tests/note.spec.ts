/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/note';
import {addFunction, listFunction, readFunction, removeFunction, editFunction} from '../src/note-app';

describe('Test block on notes', () => {
  const note1: Note = new Note('Eric', 'Blue note', 'This is a blue note', 'blue');

  it('Note constructor', () => {
    expect(new Note('Eric', 'Blue Note', 'This is a blue note', 'blue'));
  });

  it('Note write', () => {
    expect(note1.write()).to.be.equal('\{\n"user": "Eric",\n"title": "Blue note",\n"body": "This is a blue note",\n"color": "blue"\n}\n');
  });

  it('Add red note', () => {
    expect(addFunction({user: 'edusegre', title: 'Red note', body: 'This is a red note', color: 'red'})).to.be.equal('New note added!');
  });
  it('Add green note', () => {
    expect(addFunction({user: 'edusegre', title: 'Green note', body: 'This is a green note', color: 'green'})).to.be.equal('New note added!');
  });
  it('Add blue note', () => {
    expect(addFunction({user: 'edusegre', title: 'Blue note', body: 'This is a blue note', color: 'blue'})).to.be.equal('New note added!');
  });
  it('List notes', () => {
    expect(listFunction({user: 'edusegre'})).to.be.equal('Notes listed!');
  });
  it('List notes', () => {
    expect(listFunction({user: 'ericfumero'})).to.be.equal('The user dont have any notes in this system');
  });
  it('Add red note (should fail)', () => {
    expect(addFunction({user: 'edusegre', title: 'Red note', body: 'This is a red note', color: 'red'})).to.be.equal('Note title taken!');
  });
  it('Add yellow note', () => {
    expect(addFunction({user: 'edusegre', title: 'Yellow note', body: 'This is a yellow note', color: 'yellow'})).to.be.equal('New note added!');
  });
  it('Add black note (should fail)', () => {
    expect(addFunction({user: 'edusegre', title: 'Black note', body: 'This is a yellow note', color: 'black'})).to.be.equal('The color is not valid!');
  });
  it('List notes', () => {
    expect(listFunction({user: 'edusegre'})).to.be.equal('Notes listed!');
  });
  it('Read red note', () => {
    expect(readFunction({user: 'edusegre', title: 'Red note'})).to.be.equal('Note readed!');
  });
  it('Read yellow note', () => {
    expect(readFunction({user: 'edusegre', title: 'Yellow note'})).to.be.equal('Note readed!');
  });
  it('Read blue note', () => {
    expect(readFunction({user: 'edusegre', title: 'Blue note'})).to.be.equal('Note readed!');
  });
  it('Read Green note', () => {
    expect(readFunction({user: 'edusegre', title: 'Green note'})).to.be.equal('Note readed!');
  });
  it('Read black note (should fail)', () => {
    expect(readFunction({user: 'edusegre', title: 'Black note'})).to.be.equal('Note not found');
  });
  it('Edit red note', () => {
    expect(editFunction({user: 'edusegre', title: 'Red note', body: 'This is a modified red note'})).to.be.equal('Note edited!');
  });
  it('Edit black note (should fail)', () => {
    expect(editFunction({user: 'edusegre', title: 'Black note', body: 'This is a modified black note'})).to.be.equal('Note not found');
  });
  it('Read red note', () => {
    expect(readFunction({user: 'edusegre', title: 'Red note'})).to.be.equal('Note readed!');
  });
  it('Remove red note', () => {
    expect(removeFunction({user: 'edusegre', title: 'Red note'})).to.be.equal('Note removed!');
  });
  it('List notes', () => {
    expect(listFunction({user: 'edusegre'})).to.be.equal('Notes listed!');
  });
  it('Remove black note (should fail)', () => {
    expect(removeFunction({user: 'edusegre', title: 'Black note'})).to.be.equal('No note found');
  });
});
