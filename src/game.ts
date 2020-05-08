import utils from "../node_modules/decentraland-ecs-utils/index"
import { NFT } from "./nft"
import { data } from "./data"
import { InfoPanel } from "./infoPanel"

// Base scene
const baseScene = new Entity()
baseScene.addComponent(new GLTFShape("models/baseScene.glb"))
baseScene.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(baseScene)

// UI Elements
const canvas = new UICanvas()
const infoPanel = new InfoPanel(canvas)

// NFTs
const makersPlaceNFT = new NFT(
  new NFTShape("ethereum://" + data[0].address),
  new Transform({
    position: new Vector3(5, 2.5, 8),
    scale: new Vector3(4, 4, 4),
  }),
  new Color3(0.0, 1.0, 1.5),
  data[0].id,
  infoPanel
)

const cryptoKittiesNFT = new NFT(
  new NFTShape("ethereum://" + data[1].address),
  new Transform({
    position: new Vector3(8, 2.5, 8),
    scale: new Vector3(4, 4, 4),
  }),
  new Color3(1.5, 1.5, 0.0),
  data[1].id,
  infoPanel
)

const knownOriginNFT = new NFT(
  new NFTShape("ethereum://" + data[2].address),
  new Transform({
    position: new Vector3(11, 2.5, 8),
    scale: new Vector3(4, 4, 4),
  }),
  new Color3(1.5, 0.5, 0.0),
  data[2].id,
  infoPanel
)

const axieInfinityNFT = new NFT(
  new NFTShape("ethereum://" + data[3].address),
  new Transform({
    position: new Vector3(5, 2.5, 8),
    scale: new Vector3(5, 5, 5),
  }),
  new Color3(1.5, 0.8, 0.8),
  data[3].id,
  infoPanel
)
axieInfinityNFT.getComponent(Transform).scale.setAll(0)

const chainGuardiansNFT = new NFT(
  new NFTShape("ethereum://" + data[4].address),
  new Transform({
    position: new Vector3(8, 2.5, 8),
    scale: new Vector3(4, 4, 4),
  }),
  new Color3(0.0, 1.0, 1.5),
  data[4].id,
  infoPanel
)
chainGuardiansNFT.getComponent(Transform).scale.setAll(0)

const myCryptoHeroesNFT = new NFT(
  new NFTShape("ethereum://" + data[5].address),
  new Transform({
    position: new Vector3(11, 2.5, 8),
    scale: new Vector3(4, 4, 4),
  }),
  new Color3(1.25, 1.25, 1.25),
  data[5].id,
  infoPanel
)
myCryptoHeroesNFT.getComponent(Transform).scale.setAll(0)

const nfts: NFT[] = [makersPlaceNFT, cryptoKittiesNFT, knownOriginNFT, axieInfinityNFT, chainGuardiansNFT, myCryptoHeroesNFT]
const swapNFTEntity = new Entity()

// NOTE: Using the scale instead of the visibility to turn the NFT on / off 
// as there are issues with the colliders getting in the way of each other
// when the user tries to click on an NFT to get more information...
swapNFTEntity.addComponent(
  new utils.Interval(8000, () => {
    for (let i = 0; i < nfts.length; i++) {
      if (nfts[i].getComponent(Transform).scale.x == 0) {
        nfts[i]
        .getComponent(Transform)
        .scale.set(
          nfts[i].originalScale.x,
          nfts[i].originalScale.y,
          nfts[i].originalScale.z
        )
      } else {
        nfts[i].getComponent(Transform).scale.setAll(0)
      }
    }
  })
)
engine.addEntity(swapNFTEntity)