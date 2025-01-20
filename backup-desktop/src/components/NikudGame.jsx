import NikudTile from './NikudTile';
import {
  VavShuruk,
  VavHolam,
  Hirik,
  Tzereh,
  Segol,
  Kamatz,
  Kubutz,
  HolamHaser,
  Patach,
  Shva,
  Dagesh,
  Shuruk
} from './NikudSigns';

function NikudGame() {
  return (
    <div className="nikud-container">
      {/* שורה ראשונה - מחסן עליון */}
      <div className="nikud-row">
        <NikudTile><VavShuruk /></NikudTile>
        <NikudTile><VavHolam /></NikudTile>
        <NikudTile><Hirik /></NikudTile>
        <NikudTile><Tzereh /></NikudTile>
        <NikudTile><Segol /></NikudTile>
        <NikudTile><Kamatz /></NikudTile>
      </div>

      {/* שורה שנייה - מחסן תחתון */}
      <div className="nikud-row">
        <NikudTile><Kubutz /></NikudTile>
        <NikudTile><HolamHaser /></NikudTile>
        <NikudTile><Patach /></NikudTile>
        <NikudTile><Shva /></NikudTile>
        <NikudTile><Dagesh /></NikudTile>
        <NikudTile><Shuruk /></NikudTile>
      </div>
    </div>
  );
}

export default NikudGame;