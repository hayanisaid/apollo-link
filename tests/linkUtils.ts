import { assert } from 'chai';
import {
  FetchResult,
} from '../src/types';
import * as LinkUtils from '../src/linkUtils';
import * as Observable from 'zen-observable';

describe('Link utilities:', () => {
  describe('toSubscriber', () => {
    it('should return a subscriber containing next', () => {
      const subscriber = LinkUtils.toSubscriber(() => void 0);
      assert.property(subscriber, 'next');
      assert.property(subscriber, 'error');
      assert.property(subscriber, 'complete');
      assert.isDefined(subscriber.next);
      assert.isUndefined(subscriber.error);
      assert.isUndefined(subscriber.complete);
    });

    it('should return a subscriber containing next and error', () => {
      const subscriber = LinkUtils.toSubscriber(() => void 0, () => void 0);
      assert.property(subscriber, 'next');
      assert.property(subscriber, 'error');
      assert.property(subscriber, 'complete');
      assert.isDefined(subscriber.next);
      assert.isDefined(subscriber.error);
      assert.isUndefined(subscriber.complete);
    });

    it('should return a subscriber containing next, error, and complete', () => {
      const subscriber = LinkUtils.toSubscriber(() => void 0, () => void 0, () => void 0);
      assert.property(subscriber, 'next');
      assert.property(subscriber, 'error');
      assert.property(subscriber, 'complete');
      assert.isDefined(subscriber.next);
      assert.isDefined(subscriber.error);
      assert.isDefined(subscriber.complete);
    });

    it('should return same subscriber', () => {
      const subscriber = {
        next: () => void 0,
        error: () => void 0,
        complete: () => void 0,
      };
      assert.deepEqual(subscriber, LinkUtils.toSubscriber(subscriber));
    });

  });

  describe('validateOperation', () => {

    it('should throw when invalid field in operation', () => {
      assert.throws(() => LinkUtils.validateOperation(<any>{
        qwerty: '',
      }));
    });

    it('should not throw when valid fields in operation', () => {
      assert.doesNotThrow(() => LinkUtils.validateOperation({
        query: '',
        context: {},
        variables: {},
      }));
    });

  });

  describe('ensureForward', () => {
    it('should throw on when next is undefined', () => {
      assert.throws(() => LinkUtils.ensureForward(undefined as any));
    });

    it('should not throw on when next is defined', () => {
      assert.doesNotThrow(() => LinkUtils.ensureForward((operation) => <Observable<FetchResult>>{}));
    });
  });

});
