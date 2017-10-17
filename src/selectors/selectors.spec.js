/*global should*/
/*eslint no-undef: ["error", { "typeof": true }] */

import {
  profileSelector,
  userPhotosSelector,
  popularPhotosSelector,
} from './index'

const bioPlaceholder = `012345678901234567890
123456789012345678901234567890123456789012345678901234567890
123456789012345678901234567890123456789012345678901234567890
12345678901234567890123456789012345678901234567890123456789`

const state = {
  profile: {
    profileImage: 'imagePlaceholder',
    name: 'namePlacehold',
    bio: bioPlaceholder,
  },
  userPhotos: [],
  popularPhotos: [],
  bio: { truncateBio: false }
}

function getState(additionalValues = {}) {
  return {
    ...state,
    ...additionalValues,
  }
}



describe('selectors', () => {
  it('returns userPhotos', () => {
    should.deepEqual(userPhotosSelector(getState()), state.userPhotos)
  })

  it('returns popularPhotos', () => {
    should.deepEqual(popularPhotosSelector(getState()), state.popularPhotos)
  })

  it('returns profile', () => {
    const profile = profileSelector(getState())

    Object.keys(state.profile).forEach((key) => {
      should.equal(state.profile[key], profile[key])
    })
  })

  it('truncates bio', () => {
    let profile = profileSelector(getState())
    should.equal(profile.bio.length, 203)

    profile = profileSelector(getState({ bio: { truncateBio: true }}))
    should.equal(profile.bio.length, 100)
  })
})