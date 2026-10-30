/**
 * ファイトアシスト／おまかせファイトの入力計算（純粋関数。three.js 非依存）。
 * アシスト: ドラグ・竿の角度・横走りへの追従を自動にする。「巻く」は自分で押す（危ない時は自動で緩める）。
 * おまかせ: 「巻く」も自動。
 * 手動（アシストOFF）の腕前勝負の挙動はここを通らない。
 */
import type { Fight } from './fight';
import { dragRecommended } from './rigdata';

export interface AssistOut { reel: number; theta: number; steer: number; drag: number }

/** reelWanted: プレイヤーが巻くを押しているか（おまかせでは常に true） */
export function assistInputs(f: Fight, reelWanted: boolean, dragNow: number, dt = 1 / 30): AssistOut {
  const rec = dragRecommended(f.tackle);
  const m = f.mode;
  // ドラグ：基本は推奨の中間。テンションに余裕があるうちは強め（寄せる圧力）、危ない時は弱める（バラし/ライン切れ回避）
  let target = rec[0] + (rec[1] - rec[0]) * 0.6;
  if (f.tension < 0.45 && (m === 'cruise' || m === 'rest')) target = rec[1] * 1.7;
  else if (f.tension > 0.72) target = rec[0] * 0.85;
  const step = 0.9 * dt;
  const drag = Math.abs(dragNow - target) <= step ? target : dragNow + Math.sign(target - dragNow) * step;
  // 走り・突っ込み・根・首振りの間は巻かずに耐える。テンションが高いときも緩める
  const hold = m === 'run' || m === 'dive' || m === 'wedged' || m === 'headshake';
  const reel = reelWanted && !hold && f.tension < 0.7 ? 1 : 0;
  const theta = 55;
  const steer = m === 'side_run' ? (f.bearing > 0 ? -1 : 1) : 0;
  return { reel, theta, steer, drag };
}
