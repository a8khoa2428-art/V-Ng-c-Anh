import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS_DATA, STAGES_INFO } from './questionsData.ts';

test('Questions count and stage distribution are valid', () => {
  assert.equal(QUESTIONS_DATA.length >= 35, true, 'At least 35 questions exist');
  
  const stage1 = QUESTIONS_DATA.filter(q => q.stageId === 1);
  const stage2 = QUESTIONS_DATA.filter(q => q.stageId === 2);
  const stage3 = QUESTIONS_DATA.filter(q => q.stageId === 3);
  const stage4 = QUESTIONS_DATA.filter(q => q.stageId === 4);

  assert.equal(stage1.length, 9, 'Stage 1 has 9 questions');
  assert.equal(stage2.length, 9, 'Stage 2 has 9 questions');
  assert.equal(stage3.length, 9, 'Stage 3 has 9 questions');
  assert.equal(stage4.length, 9, 'Stage 4 has 9 questions');
});

test('Every question has an explanation and valid structure', () => {
  for (const q of QUESTIONS_DATA) {
    assert.ok(q.explanation && q.explanation.length > 5, `Question ${q.id} must have non-empty explanation`);
    assert.ok(q.prompt && q.prompt.length > 3, `Question ${q.id} must have non-empty prompt`);

    if (q.type === 'multiple_choice' || q.type === 'blood_compatibility') {
      assert.ok(q.options.length >= 3, `MC ${q.id} should have at least 3 options`);
      const hasCorrect = q.options.some(o => o.id === q.correctOptionId);
      assert.ok(hasCorrect, `MC ${q.id} must have an option matching correctOptionId`);
    }

    if (q.type === 'true_false') {
      assert.equal(typeof q.isCorrect, 'boolean', `TF ${q.id} must have boolean isCorrect`);
    }

    if (q.type === 'matching') {
      assert.ok(q.pairs.length >= 3, `Matching ${q.id} must have at least 3 pairs`);
    }

    if (q.type === 'tube_drag') {
      assert.ok(q.items.length >= 3, `Tube drag ${q.id} must have items`);
      for (const item of q.items) {
        assert.ok(['upper', 'lower'].includes(item.targetZone));
      }
    }

    if (q.type === 'table_fill') {
      assert.equal(q.rows.length, 4, `Table fill ${q.id} must have 4 ABO rows`);
    }

    if (q.type === 'order_steps') {
      assert.ok(q.steps.length >= 3, `Order steps ${q.id} must have steps`);
      const orders = q.steps.map(s => s.correctOrder).sort();
      assert.deepEqual(orders, [1, 2, 3, 4]);
    }

    if (q.type === 'fill_blank') {
      assert.ok(q.sentenceParts.length === 2);
      assert.ok(q.correctWord.length > 0);
    }
  }
});
