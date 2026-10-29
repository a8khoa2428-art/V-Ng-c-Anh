import test from 'node:test';
import assert from 'node:assert/strict';
import {
  checkBloodCompatibility,
  checkShortAnswer,
  shuffleArray,
  BLOOD_GROUPS_DATA,
  type BloodGroup
} from './bloodLogic.ts';

test('Blood Group O is universal donor (chuyên cho)', () => {
  const groups: BloodGroup[] = ['A', 'B', 'AB', 'O'];
  for (const recipient of groups) {
    const result = checkBloodCompatibility('O', recipient);
    assert.equal(result.compatible, true, `O should be able to donate to ${recipient}`);
  }
});

test('Blood Group AB is universal recipient (chuyên nhận)', () => {
  const groups: BloodGroup[] = ['A', 'B', 'AB', 'O'];
  for (const donor of groups) {
    const result = checkBloodCompatibility(donor, 'AB');
    assert.equal(result.compatible, true, `${donor} should be able to donate to AB`);
  }
});

test('Incompatible blood transfusions cause agglutination', () => {
  // A -> B: A has KN A, B has KT α -> agglutination
  const res1 = checkBloodCompatibility('A', 'B');
  assert.equal(res1.compatible, false);
  assert.match(res1.reactionDetails, /kháng thể α/);

  // B -> A: B has KN B, A has KT β -> agglutination
  const res2 = checkBloodCompatibility('B', 'A');
  assert.equal(res2.compatible, false);
  assert.match(res2.reactionDetails, /kháng thể β/);

  // AB -> O: AB has KN A & B, O has KT α & β -> agglutination
  const res3 = checkBloodCompatibility('AB', 'O');
  assert.equal(res3.compatible, false);
});

test('Identical blood groups are always compatible', () => {
  const groups: BloodGroup[] = ['A', 'B', 'AB', 'O'];
  for (const g of groups) {
    const result = checkBloodCompatibility(g, g);
    assert.equal(result.compatible, true, `${g} to ${g} must be compatible`);
  }
});

test('Antigen and Antibody data matches KHTN 8 textbook exactly', () => {
  assert.deepEqual(BLOOD_GROUPS_DATA.A.antigens, ['A']);
  assert.deepEqual(BLOOD_GROUPS_DATA.A.antibodies, ['β']);

  assert.deepEqual(BLOOD_GROUPS_DATA.B.antigens, ['B']);
  assert.deepEqual(BLOOD_GROUPS_DATA.B.antibodies, ['α']);

  assert.deepEqual(BLOOD_GROUPS_DATA.AB.antigens, ['A', 'B']);
  assert.deepEqual(BLOOD_GROUPS_DATA.AB.antibodies, []);

  assert.deepEqual(BLOOD_GROUPS_DATA.O.antigens, []);
  assert.deepEqual(BLOOD_GROUPS_DATA.O.antibodies, ['α', 'β']);
});

test('checkShortAnswer handles normalized Vietnamese matching', () => {
  assert.equal(checkShortAnswer('Huyết tương', ['huyết tương']), true);
  assert.equal(checkShortAnswer('  Hồng cầu! ', ['hồng cầu']), true);
  assert.equal(checkShortAnswer('tiểu cầu', ['tiểu cầu']), true);
  assert.equal(checkShortAnswer('bạch cầu', ['hồng cầu']), false);
});

test('shuffleArray maintains all items and length', () => {
  const original = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(original);
  assert.equal(shuffled.length, 5);
  assert.deepEqual([...shuffled].sort(), original);
});
