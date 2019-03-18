CREATE TABLE IF NOT EXISTS `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `email` varchar(55) NOT NULL,
  `username` varchar(20) NOT NULL,
  `hash` varchar(15) NOT NULL,
  `salt` varchar(55) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
