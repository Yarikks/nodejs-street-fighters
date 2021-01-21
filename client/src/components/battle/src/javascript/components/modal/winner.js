import { showModal } from "./modal";
import { createFighterPreview} from '../fighterPreview';

export function showWinnerModal(fighter) {
  let modalData = {
    title: `Winner is ${fighter.name} !🥳🥳🥳`,
    bodyElement: createFighterPreview(fighter, 'right'),
    onClose: () => {
      window.location.reload();
      return false;
    }
  }
  showModal(modalData);
}
