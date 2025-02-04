
const userStatus = {
  pending: 'pending',
  active: 'active',
}

const postConfig = {
  postPerPage: 3,
}


const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n'+
'MIIJKQIBAAKCAgEA50xRcFErVdUtcLZBKObOO8GptqJCAIlTvYdwF/imz5rdViic\n'+
'O0rNzzRoRbbPBQkisYsWAwZcND4ygsnUANtgjFGKozp1lfVJsuLkz/HrRoFNFaH7\n'+
'q6gyvhojIOXta9VMQaDhzoFfzBKxVVgc9OjIW8qo6Bn2tbfTlcwC/bsNvdwi/LGK\n'+
'uCopuYLhYXs2r0hmjcDX4FQa4VQbiTbX5DhNUIxcWfRuoBNoTKelVlzi7LJCSOks\n'+
'oBth5EtwAsQX7hePqFtCmUHrmRo8EfuCnn7IC0Yi0zsBn1u/NBhysOySCRjKRJVh\n'+
'T0mCUrX4sDSaCvWZw1r6GB3NQb7GAzJzGysyX/6IpXawWPxX2cIowV95LDG++nxV\n'+
'RVznbZZ4yECmr0bUrY/haKSH62fKQPrBad9fw2B4qY471LH4vpmH/cNcZG7itw+q\n'+
'vhk7v2p4fMPQRmR+zrBvegydsYK2gFMxtu7R1RdYOw8WynpW51Yg5q8qqUdakcCq\n'+
'8NOY3u6fCSaYQJvybq20DAI56MDrJvQ2hRIooXkf6NFfSkd6lIjd3UrI8nGl/o1G\n'+
'1KBDjeipIG9wJBBs14kJCMjT1o6xuFiUMYz9QNMhZVRDV1L5KBLkVDBboEjnFJEd\n'+
'AsLIqyTLiL90jwo61ZFohmGIpY8RIuuRNoDo1YZ0yMAdL6GNTgymufYwCAUCAwEA\n'+
'AQKCAgA7C3Z2r6HaZXMWJNB5eoIHKycB4mXq8SOZbGunEuiycpwyFGfdkvj6/ivo\n'+
'MASlCnH61MCnwQXkqEQIszEVjusUpvQ3OwMtZtKLgfRbSSyAcR2WeiVe6q8ZbF6v\n'+
'VULIlkjDMCi0qL4lwFfYq4eo1YvgMtnvdkFOnkC7KrtQvmGBqCKeU0xQOyMvokOa\n'+
'uPN6x4a2hRYWxCGgh/IHkyKFtgG2oD4rEIT1BD9J4joI0+lx9weIyU2FCbhxqPhN\n'+
'HHXnZ8haeAGGUhesm8/d31C22TKD/kGBnryJS8iBqgQNOjcFb3ijDWcr8F3+c0mq\n'+
'4aK5TX0VK7JQWbs+H085HbXYp6xR7Ky+fSw1J/okAzU06dqmmCHC8qNTNJyq+b/B\n'+
'YjVPSYgblgEYSrfm7bi3+4YAwmPIjUrrQTGhTTLUGRkfgyyqaQVgk9e8u1r1n2bc\n'+
'R0c9/ok0ZPuJ2NvW19jw2wOZAUpzHokFpC4VJzVDpzemTemORPkZY/9kfs0WLp2j\n'+
'hTNWSG5/FaQH9qBnVLOSQECoIpNDMRzuzaLgiOAUh8dHmzOLzEcquMsCdGTjNf8Q\n'+
'H7sTHT1gPYWjU69Jw6nwby3iE+1X1bO41e5odttEdpUa3h7b3KyvdtbyWELyvIpe\n'+
'l7D6z/BUlV9VjGkmUNP0Mr7ljI7Op862kGHoseV+i/8f7jK2uQKCAQEA/1HgG0sC\n'+
'2lBd0dFhFzt499l1D+sJhURCietYbrsZ+xXhrA9TmBFOXacITDor8B9j+0ZRxwlV\n'+
'efTEJCPArPZzpfLfcNJlkG3vcv4dSsLID7I4k+GMA3EzEitBZqMSLwehIQI36bpf\n'+
'2jyRfvo/1/T6OKUqjyLV6a6yEDejjVWVJOUMaBd2CfV6Jqullgydvpxx0tsyXS1H\n'+
'ZWtaTJCQF8egcGYqewsu7kwiiSxkNZ/wR37BJQNlqgNUgTZcivHHvjU+uJ0VEEws\n'+
'f9y8/voeIwtxV1+/JjkgK0zmx09GEU0Jaz1v5auMJB5FULQ+G0TPKnUvk8GciJyv\n'+
'sHwj6dvp2kvY6wKCAQEA5+oPa1RoVtyrchzr0aCyPCAMr44qNy8gDlD6JjkMg9nk\n'+
'7AropUPBZw5LAnl3R6hB/9COQECBgFxXjmBICgBANNF1fIC/ziBGPpf4u+3cQeX5\n'+
'JGur7P4abndXtrflpWMfmIC7e/lFTLtjslCWC8Im7JCFI0IjNFGZyrp73YYwgL3i\n'+
'AnsM2umpf2zoG28IDbBFfqpRe8o7QkSj2eIjBRzRWX7jKNKYovM7lktWywJwzcnc\n'+
'Ul2USbYi1HjBe3VoGMo3H7IWpN5Pnx6SKTi/qHpqsGVFBW6/IlfiXViW/hkJ6CVT\n'+
'tgW1Wth6GqTrUlEctB/OXbsQE0KKmECQHYC488pmzwKCAQA7QVtLukr9M+2yRm/M\n'+
'HodirltWyGu7PC5dJ/usJ0xOU7O+ZQg3oLyZS6zHVDDiV8ayiI1uLiJiXYYwBQQw\n'+
'oDoS550n6AyeSoVqIMPXmAEqc2hiGdSO7/S0YMma8nnD5Hdm28byPckFM01pNNcg\n'+
'XcC86MhJ1AHlbB/zV5ZjtNsaZvZMKjXA9fHVi7ywaFkr5c8c6rZznZCWXyXj4yEu\n'+
'A6yeqXduexf3QkA5qc3QDECNt0NIPdOYc5FnM6Citp5u7JiT7BD5aVRikG5kltPr\n'+
'ujoh1xzb2CI5Km3dD+7pEQIAm4+etAOgVk4r/sjzNzMFXZEfL64Onp6/zO/g1KMf\n'+
'gL7lAoIBAQCYeJLgnqLmkLgLEyabMIpd6zhL5yysEUiDAQwlOxaWTRgrc9SWauBp\n'+
'b8UzAEbCjsWteSE87uv1R0CtM3HJWXbdAuS6ES+JRkDIgEOg0nYfwSG2py9mZX1d\n'+
'KQs67taFkJDCQ8h/blf4Za7bGg479s5+c1mE38Ojbw6scURkVQfobG598QZ3mm28\n'+
'gA5tkub5kO1vpGxj9YZWQCh1ZC5f+x1MOJcCTMrbPwzq9+c9GwKs2U0HvcxzVdK6\n'+
'XBXgpETnH3N0XDJ0/E/erkur3EptauZfyITDWJdC7gK+GjNTJYUU4g2SO1iLPI2y\n'+
'nMC14uv7JHoZt5WPBA14oeHd87YlWemTAoIBAQDQcvEdojPVTEIsQnq7orMwzKl/\n'+
'3S2V5+F/GZxB2Ev55tnPYS9fJLavFmwfBc7GIFaas086S46XAqhgd02GUYKaF1+A\n'+
'pflAqHfAV6hzpkVCuM6fsq6ttETQbpkjyzqDnh7C2y2y3zVpuqE/RCuniP4oY5lX\n'+
'E7sI58EKjGbla9uXUXlwbVJsyr2N7dBdoszTf7HfyauiWOCYWa3OtpI3WEgBDTsZ\n'+
'k0iNSqTumzEaFIbhErbRNYuLFqK8tUpFBc0Tw/YrFIoiXKM7FTsR0SLPJAocAf/0\n'+
'h6FEFUV1bGyKh8frynnuOVcNjB1UXK28wvfhid/E2igXi3b4XD+UuOUqKJPS\n'+
'-----END RSA PRIVATE KEY-----'

const publicKey = '-----BEGIN PUBLIC KEY-----\n'+
'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA50xRcFErVdUtcLZBKObO\n'+
'O8GptqJCAIlTvYdwF/imz5rdViicO0rNzzRoRbbPBQkisYsWAwZcND4ygsnUANtg\n'+
'jFGKozp1lfVJsuLkz/HrRoFNFaH7q6gyvhojIOXta9VMQaDhzoFfzBKxVVgc9OjI\n'+
'W8qo6Bn2tbfTlcwC/bsNvdwi/LGKuCopuYLhYXs2r0hmjcDX4FQa4VQbiTbX5DhN\n'+
'UIxcWfRuoBNoTKelVlzi7LJCSOksoBth5EtwAsQX7hePqFtCmUHrmRo8EfuCnn7I\n'+
'C0Yi0zsBn1u/NBhysOySCRjKRJVhT0mCUrX4sDSaCvWZw1r6GB3NQb7GAzJzGysy\n'+
'X/6IpXawWPxX2cIowV95LDG++nxVRVznbZZ4yECmr0bUrY/haKSH62fKQPrBad9f\n'+
'w2B4qY471LH4vpmH/cNcZG7itw+qvhk7v2p4fMPQRmR+zrBvegydsYK2gFMxtu7R\n'+
'1RdYOw8WynpW51Yg5q8qqUdakcCq8NOY3u6fCSaYQJvybq20DAI56MDrJvQ2hRIo\n'+
'oXkf6NFfSkd6lIjd3UrI8nGl/o1G1KBDjeipIG9wJBBs14kJCMjT1o6xuFiUMYz9\n'+
'QNMhZVRDV1L5KBLkVDBboEjnFJEdAsLIqyTLiL90jwo61ZFohmGIpY8RIuuRNoDo\n'+
'1YZ0yMAdL6GNTgymufYwCAUCAwEAAQ==\n'+
'-----END PUBLIC KEY-----';

const mailConfig = {
  senderAddress: 'augusto.ciuccatosti@gmail.com',
  smtpPassword: 'rytfsyscqlstnhdl',
  subject: 'Social Tnv User Registration',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  html: '',

}

export {
  userStatus,
  privateKey,
  publicKey,
  mailConfig,
  postConfig,
}